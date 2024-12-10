const { test, expect, request } = require('@playwright/test');

test.describe('API Automation - Login', () => {
    let apiContext;

    test.beforeAll(async ({ playwright }) => {
        // Cấu hình bỏ qua lỗi chứng chỉ SSL
        apiContext = await request.newContext({
            ignoreHTTPSErrors: true // Thêm cấu hình này
        });
    });

    test('Login with invalid credentials', async () => {
        const response = await apiContext.post('https://scity.innovation.com.vn/login', {
            data: {
                username: '123',
                password: '123'
            }
        });

        // Kiểm tra trạng thái HTTP
        expect(response.status()).toBe(401);

        // Kiểm tra nội dung JSON trả về
        const responseBody = await response.json();
        expect(responseBody.message).toBe('Invalid username or password');
    });

    test('Response time is less than 2 seconds', async () => {
        const startTime = Date.now();
        const response = await apiContext.post('https://scity.innovation.com.vn/login', {
            data: {
                username: 'tenant',
                password: '12345678x@X'
            }
        });
        const endTime = Date.now();

        const responseTime = endTime - startTime;
        expect(responseTime).toBeLessThan(2000);
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });
});
