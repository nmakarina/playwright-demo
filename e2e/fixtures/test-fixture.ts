import { test as base, TestInfo, expect } from '@playwright/test';
import { LoginPage } from './../pages/login-page.ts';

const loginUser = process.env.TEST_LOGIN;
const passUser = process.env.TEST_PASSWORD;


export const test = base.extend<{ authUser: void }>({
    authUser: [async ({ page }, use, testInfo) => {
        const loginPage = new LoginPage(page);
        await test.step("Authentication", async () => {
            if (!loginUser || !passUser) {
                throw Error(`Provide "TEST_LOGIN" and "TEST_PASSWORD" inside .env`);
            }
            await loginPage.login(loginUser, passUser);
        })

        await use();

        await loginPage.after(testInfo);
    }, { auto: true }]
});
export { expect } from '@playwright/test';