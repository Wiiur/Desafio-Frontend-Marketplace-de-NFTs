// tests/compra.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Fluxo Completo do Marketplace: Compra, Carrinho e Perfil', () => {
  
  test('Deve fazer login, adicionar itens, validar no carrinho, finalizar compra e navegar no perfil', async ({ page, isMobile }) => {
    // 1. Acessa a página inicial
    await page.goto('/');

    // 2. Faz o Login (trata a diferença de UI no mobile)
    if (isMobile) {
      // Busca o único botão que existe dentro do <header> (banner)
      await page.getByRole('banner').getByRole('button').click(); 
    }
    
    // Condicional: Verifica se o botão "Entrar" existe antes de prosseguir.
    // Assim o teste não falha se a sessão já estiver guardada de um teste anterior!
    const btnAbrirLogin = page.getByRole('button', { name: 'Entrar' }).first();
    
    if (await btnAbrirLogin.isVisible()) {
      await btnAbrirLogin.click();
      await page.getByPlaceholder('contato@email.com').fill('colecionador@kurio.com');
      await page.getByPlaceholder('***********').fill('senha123');
      await page.locator('form').getByRole('button', { name: 'Entrar', exact: true }).click();
    } else if (isMobile) {
      // Se já estava logado e abriu o menu, fecha o menu novamente para não tapar os NFTs
      await page.getByRole('banner').getByRole('button').click(); 
    }
    // 3. Adiciona um item ao carrinho clicando no primeiro card de NFT ou no seu botão de ação
    await page.waitForTimeout(2000);
    const primeiroNftCard = page.locator('main .grid a').first();
    await primeiroNftCard.waitFor({ state: 'visible', timeout: 15000 });
    await primeiroNftCard.click();

    // Clica no botão de adicionar/comprar dentro da página de detalhes ou card
    const btnComprarOuAdicionar = page.getByRole('button', { name: /comprar|adicionar|carrinho/i }).first();
    await btnComprarOuAdicionar.click();

    // 4. Vai para o carrinho pela navegação correta de cada viewport
    if (isMobile) {
      // Usa o banner/header para encontrar o link do carrinho de forma segura no mobile
      const linkCarrinhoMobile = page.getByRole('banner').locator('a[href="/carrinho"]');
      await linkCarrinhoMobile.waitFor({ state: 'visible', timeout: 10000 });
      await linkCarrinhoMobile.click();
    } else {
      const linkCarrinho = page.locator('a[href="/carrinho"]').first();
      await linkCarrinho.waitFor({ state: 'visible' });
      await linkCarrinho.click();
    }
    
    await expect(page).toHaveURL('/carrinho');
    
    // 5. Avança para o pagamento
    const btnAvancar = page.getByRole('link', { name: /Conectar e finalizar|pagamento/i }).first();
    await btnAvancar.click();

    // 6. Confirma a compra
    const btnConfirmar = page.getByRole('button', { name: 'Confirmar compra' });
    await expect(btnConfirmar).toBeVisible();
    await expect(btnConfirmar).toBeEnabled({ timeout: 10000 });
    await btnConfirmar.click();

    // 7. Espera pelo recibo via Socket.IO
    const recibo = page.getByText('Seus NFTs agora estão na sua carteira');
    await expect(recibo).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(5000); 

    // 8. Fecha o recibo
    const btnVerEtherscan = page.getByRole('button', { name: /Ver no Etherscan/i });
    if (await btnVerEtherscan.isVisible()) {
      await btnVerEtherscan.click();
    }

    // 9. Volta para a Home
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // 10. Acessa o Perfil e aba de Carteiras
    if (isMobile) {
      await page.locator('a[href="/perfil"]').last().click();
    } else {
      await page.goto('/perfil');
    }
    
    await expect(page.getByRole('heading', { name: 'Meu perfil' })).toBeVisible();

    const btnCarteiras = page.getByRole('button', { name: 'Carteiras' });
    await expect(btnCarteiras).toBeVisible();
    await btnCarteiras.click();

    console.log('🎉 Teste E2E concluído com sucesso!');
  });
});