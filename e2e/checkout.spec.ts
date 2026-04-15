import { test, expect } from "@playwright/test";

const email = `teste_${Date.now()}@devstore.com`;
const password = "123456";
const name = "Felipe Teste";

test.describe("Fluxo completo de compra", () => {
  test("Cadastro -> login -> carrinho -> checkout -> pedidos", async ({
    page,
  }) => {
    // Cadastro
    await test.step("Cadastrar novo usuário", async () => {
      // Navega para a página de registro
      await page.goto("/register");

      // Preenche o formulário de registro
      await page.fill("#name", name);
      await page.fill("#email", email);
      await page.fill("#password", password);

      // Clica no botão de submit e aguarda o redirecionamento p/ login
      await page.click('button[type="submit"]');
      await page.waitForURL("/login");
    });

    // Login
    await test.step("Fazer login", async () => {
      // A página de login já está aberta pelo waitForURL acima
      await page.fill("#email", email);
      await page.fill("#password", password);

      // Clica em Entrar e aguarda voltar para a home
      await page.click('button[type="submit"]');
      await page.waitForURL("/");
    });

    // Adicionar ao carrinho
    await test.step("Adicionar produto ao carrinho", async () => {
      // Vai para a listagem de produtos
      await page.goto("/products");

      // Clica no primeiro produto para ir para a página de detalhes
      // href^=/products significa "link que começa com /products"
      await page.locator('a[href^="/products/"]').first().click();

      // Clica no botão de adicionar ao carrinho
      await page.getByRole("button", { name: "Adicionar ao Carrinho" }).click();
    });

    // Checkout
    await test.step("Preencher checkout e finalizar pedido", async () => {
      // Navega diretamente para o checkout (o middleware vai deixar passar pois realizou o login antes)
      await page.goto("/checkout");

      // Preenche os dados pessoais
      await page.fill("#fullName", name);
      await page.fill("#email", email);
      await page.fill("#phone", "(11) 99999-9999");

      // CEP com 8 chars (Não dispara a busca automatica do viaCEP)
      await page.fill("#zipCode", "13210-00");

      // Preenche os dados de endereço
      await page.fill("#street", "Rua Exemplo");
      await page.fill("#number", "123");
      await page.fill("#neighborhood", "Bairro Exemplo");
      await page.fill("#city", "Jundiaí");
      await page.fill("#state", "SP");

      // Clica no botão de finalizar pedido
      await page.click('button[type="submit"]');
      await page.waitForURL("/checkout/success");
    });

    // Verificar pedidos
    await test.step("Ver pedido na página de orders", async () => {
      // Navega para a página de pedidos
      await page.goto("/orders");

      // Verifica que a URL é /orders (Não foi direcionado para login)
      await expect(page).toHaveURL("/orders");

      // Verifica que existe ao menos um elemento com a palavra "Pedido" na tela
      // getByText com regex /pedido/i é case-insensitive, ou seja, vai encontrar "Pedido", "pedido", "PEDIDO", etc.
      await expect(page.getByText(/pedido/i).first()).toBeVisible();
    });
  });
});
