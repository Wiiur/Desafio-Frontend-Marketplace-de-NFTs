import { test, expect } from '@playwright/test';

test.describe('Fluxo Completo do Marketplace: Compra, Carrinho e Perfil', () => {
  
  test('Deve fazer login, adicionar itens, validar no carrinho, finalizar compra e navegar no perfil', async ({ page }) => {
    // 1. Acessa a página inicial
    await page.goto('/');

    // 2. Faz o Login
    await page.getByRole('button', { name: 'Entrar' }).first().click();
    await page.getByPlaceholder('contato@email.com').fill('colecionador@kurio.com');
    await page.getByPlaceholder('***********').fill('senha123');
    await page.locator('form').getByRole('button', { name: 'Entrar', exact: true }).click();
    
    // 3. Adiciona um item ao carrinho clicando no botão "Adicionar +" do primeiro NFT
    await page.waitForTimeout(2000);
    const btnAdicionar = page.getByRole('button', { name: /Adicionar \+/i }).first();
    await btnAdicionar.waitFor({ state: 'visible', timeout: 15000 });
    await btnAdicionar.click();

    // 4. Clica no ícone/link do carrinho na Navbar para conferir os itens (evita recarregamento total via page.goto)
    const linkCarrinho = page.locator('a[href="/carrinho"]').first();
    await linkCarrinho.waitFor({ state: 'visible' });
    await linkCarrinho.click();
    
    // Valida que estamos na rota do carrinho
    await expect(page).toHaveURL('/carrinho');
    
    // 5. Na página do carrinho, clica no link/botão para avançar para o pagamento
    const btnAvancar = page.getByRole('link', { name: /Conectar e finalizar|pagamento/i }).first();
    await btnAvancar.click();

    // 6. Clica para confirmar a compra
    const btnConfirmar = page.getByRole('button', { name: 'Confirmar compra' });
    await expect(btnConfirmar).toBeVisible();
    await expect(btnConfirmar).toBeEnabled({ timeout: 10000 });
    await btnConfirmar.click();

    // 7. Espera pelo recibo do Socket.IO (aguarda os 5 segundos solicitados e valida o recibo)
    const recibo = page.getByText('Seus NFTs agora estão na sua carteira');
    await expect(recibo).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(5000); // Espera 5 segundos conforme solicitado

    // 8. Clica no botão "Ver no Etherscan" para fechar/concluir o recibo
    const btnVerEtherscan = page.getByRole('button', { name: /Ver no Etherscan/i });
    if (await btnVerEtherscan.isVisible()) {
      await btnVerEtherscan.click();
    }

    // 8. Volta para a tela de início (Home)
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // 9. Abre o Perfil, valida o carregamento e clica na aba "Carteiras"
    await page.goto('/perfil');
    await expect(page.getByRole('heading', { name: 'Meu perfil' })).toBeVisible();

    // Clica na aba "Carteiras" conforme solicitado
    const btnCarteiras = page.getByRole('button', { name: 'Carteiras' });
    await expect(btnCarteiras).toBeVisible();
    await btnCarteiras.click();

    console.log('🎉 Teste E2E concluído com sucesso!');
  });

});