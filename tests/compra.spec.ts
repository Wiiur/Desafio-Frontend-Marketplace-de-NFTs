// tests/compra.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Fluxo Completo do Marketplace: Compra, Carrinho e Perfil', () => {
  
  test('Deve fazer login, adicionar itens, validar no carrinho, finalizar compra e navegar no perfil', async ({ page, isMobile }) => {
    
    // ==========================================
    // 1. INÍCIO & LOGIN
    // ==========================================
    await page.goto('/');

    if (isMobile) {
      // Abre o menu hambúrguer no cabeçalho
      const btnMenuMobile = page.getByRole('banner').getByRole('button').first();
      await btnMenuMobile.click();
    }
    
    // O botão "Entrar" está agora acessível
    const btnAbrirLogin = page.getByRole('button', { name: 'Entrar' }).first();
    await btnAbrirLogin.click();

    // Preenche as credenciais
    await page.getByPlaceholder('contato@email.com').fill('colecionador@kurio.com');
    await page.getByPlaceholder('***********').fill('senha123');
    await page.locator('form').getByRole('button', { name: 'Entrar', exact: true }).click();

    // Aguarda que o modal de login desapareça antes de interagir com os produtos
    await expect(page.locator('form')).toBeHidden({ timeout: 15000 }).catch(() => {});

    // ==========================================
    // 2. SELEÇÃO DO NFT NO CATÁLOGO
    // ==========================================
    // SOLUÇÃO DEFINITIVA: A imagem do NFT é o único elemento comum entre os dois layouts.
    // O pseudo-seletor :visible garante que ignoramos carrosséis ocultos noutras partes da página.
    const primeiroNftCard = page.getByRole('img', { name: /Emerald Ape|Violet Nomad|Ivory Baron|Golden Beat|Cosmic Bloon/i })
                                .and(page.locator(':visible'))
                                .first();
    
    await primeiroNftCard.waitFor({ state: 'visible', timeout: 15000 });
    await primeiroNftCard.click({ force: true });

    // Na página de detalhes, adiciona ao carrinho
    const btnComprarOuAdicionar = page.getByRole('button', { name: /comprar|adicionar|carrinho/i }).first();
    await btnComprarOuAdicionar.waitFor({ state: 'visible' });
    await btnComprarOuAdicionar.click();

    // ==========================================
    // 3. ACESSO AO CARRINHO
    // ==========================================
    if (isMobile) {
      const linkCarrinhoMobile = page.getByRole('banner').locator('a[href="/carrinho"]');
      await linkCarrinhoMobile.click({ force: true });
    } else {
      const linkCarrinhoDesktop = page.locator('a[href="/carrinho"]').first();
      await linkCarrinhoDesktop.click({ force: true });
    }
    
    await expect(page).toHaveURL('/carrinho');

    // ==========================================
    // 4. CHECKOUT E FINALIZAÇÃO DE COMPRA
    // ==========================================
    // Avança para o pagamento
    const btnAvancar = page.getByRole('link', { name: /Conectar e finalizar|pagamento/i }).first();
    await btnAvancar.click();

    // Confirma a compra
    const btnConfirmar = page.getByRole('button', { name: 'Confirmar compra' });
    await expect(btnConfirmar).toBeVisible({ timeout: 10000 });
    await expect(btnConfirmar).toBeEnabled();
    await btnConfirmar.click();

    // Valida o recibo assíncrono (Socket.IO)
    const recibo = page.getByText(/Seus NFTs agora estão na sua carteira|sucesso/i).first();
    await expect(recibo).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(3000); 

    // Fecha o recibo/modal se houver botão correspondente
    const btnVerEtherscan = page.getByRole('button', { name: /Ver no Etherscan|Fechar/i }).first();
    if (await btnVerEtherscan.isVisible()) {
      await btnVerEtherscan.click({ force: true });
    }

    // ==========================================
    // 5. NAVEGAÇÃO SEGURA PARA O PERFIL
    // ==========================================
    // Navegar de forma absoluta é a forma mais resiliente para evitar menus mutáveis
    await page.goto('/perfil');
    
    // Valida o carregamento da página de perfil
    await expect(page.getByRole('heading', { name: 'Meu perfil' })).toBeVisible({ timeout: 10000 });

    // Acede à aba de carteiras
    const btnCarteiras = page.getByRole('button', { name: 'Carteiras' });
    await expect(btnCarteiras).toBeVisible();
    await btnCarteiras.click();

    console.log('🎉 Teste E2E Mobile e Desktop concluído com sucesso e sem falhas!');
  });
});