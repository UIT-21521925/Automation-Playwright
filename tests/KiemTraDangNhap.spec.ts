import { test, expect } from '@playwright/test';

test('Hiển thị thông báo lỗi khi "Tên đăng nhập" bỏ trống', async ({ page }) => {
  await page.goto('https://scity.innovation.com.vn/login'); 
  await 
  await expect(page).toHaveURL(/login/); 


  await page.fill('input[name="password"]', '12345678x@X');
  await page.click('button[type="submit"]');


  const errorMessage = await page.locator('span.MuiTypography-root.MuiTypography-caption1.css-109p8lb'); 
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Vui lòng nhập tên đăng nhập');
});

test('Hiển thị thông báo lỗi khi "Mật khẩu" trống', async ({ page }) => {
    await page.goto('https://scity.innovation.com.vn/login'); 
    await expect(page).toHaveURL(/login/); 
  
    await page.fill('input[name="username"]', 'tenant');
  
    await page.click('button[type="submit"]');
  
    const errorMessage = await page.locator('span.MuiTypography-root.MuiTypography-caption1.css-109p8lb');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Vui lòng nhập mật khẩu'); 
});
  test('Hiển thị thông báo lỗi khi bỏ trống ở hai trường bắt buộc (Tên đăng nhập, Mật khẩu)', async ({ page }) => {
    await page.goto('https://scity.innovation.com.vn/login'); 
    await expect(page).toHaveURL(/login/); 

    await page.click('button[type="submit"]'); 
  

    const usernameError = await page.locator('text="Vui lòng nhập tên đăng nhập"');
    const passwordError = await page.locator('text="Vui lòng nhập mật khẩu"');
    await expect(usernameError).toBeVisible(); 
    await expect(passwordError).toBeVisible(); 
    await expect(usernameError).toHaveText('Vui lòng nhập tên đăng nhập'); 
    await expect(passwordError).toHaveText('Vui lòng nhập mật khẩu'); 
  });

  test('Không thể đăng nhập khi tài khoản chưa được đăng ký', async ({ page }) => {
    await page.goto('https://scity.innovation.com.vn/login'); 
    await expect(page).toHaveURL(/login/);

    await page.fill('input[name="username"]', 'abcdef'); 
    await page.fill('input[name="password"]', '12345678'); 
    await page.click('button[type="submit"]');
  

    const usernameError = await page.locator('text="Sai tên đăng nhập hoặc mật khẩu"').first();
    const passwordError = await page.locator('text="Sai tên đăng nhập hoặc mật khẩu"').nth(1);
    await expect(usernameError).toBeVisible(); 
    await expect(passwordError).toBeVisible(); 
    await expect(usernameError).toHaveText('Sai tên đăng nhập hoặc mật khẩu');
    await expect(passwordError).toHaveText('Sai tên đăng nhập hoặc mật khẩu');
  });

  test('Thông báo lỗi khi tên đăng nhập không đúng nguyên tắc (dưới 6 kí tự)', async ({ page }) => {
    await page.goto('https://scity.innovation.com.vn/login'); 
    await expect(page).toHaveURL(/login/); 

    await page.fill('input[name="username"]', 'abcd'); 
    await page.fill('input[name="password"]', '12345678'); 
    await page.click('button[type="submit"]'); 

    const usernameError = await page.locator('text="Tên đăng nhập phải có từ 4-20 ký tự"').first();
    await expect(usernameError).toBeVisible(); 
    await expect(usernameError).toHaveText('Tên đăng nhập phải có từ 4-20 ký tự'); 
  });

  test('Thông báo lỗi khi mật khẩu không đúng nguyên tắc(dưới 6 kí tự)', async ({ page }) => {
    await page.goto('https://scity.innovation.com.vn/login'); 
    await expect(page).toHaveURL(/login/);

    await page.fill('input[name="username"]', '123456789'); 
    await page.fill('input[name="password"]', '123'); 
    await page.click('button[type="submit"]'); 

    const passwordError = await page.locator('text="Mật khẩu phải có ít nhất 8 ký tự"');
    await expect(passwordError).toBeVisible();
    await expect(passwordError).toHaveText('Mật khẩu phải có ít nhất 8 ký tự'); 
  });

  test('Thông báo lỗi khi tên đăng nhập không đúng nguyên tắc(trên 50 kí tự)', async ({ page }) => {
    await page.goto('https://scity.innovation.com.vn/login'); 
    await expect(page).toHaveURL(/login/); 

    await page.fill('input[name="username"]', '123456789123456789123456789123456789123456789123456789'); 
    await page.fill('input[name="password"]', '12345678'); 

    await page.click('button[type="submit"]');
  
    const usernameError = await page.locator('text="Tên đăng nhập phải có từ 4-20 ký tự"').first();
    await expect(usernameError).toBeVisible(); 
    await expect(usernameError).toHaveText('Tên đăng nhập phải có từ 4-20 ký tự'); 
  });

  test('Thông báo lỗi khi tên đăng nhập không đúng nguyên tắc (trên 50 kí tự)', async ({ page }) => {
    await page.goto('https://scity.innovation.com.vn/login');
    await expect(page).toHaveURL(/login/); 

    await page.fill('input[name="username"]', 'abcdef'); 
    await page.fill('input[name="password"]', '123456789123456789123456789123456789123456789123456789'); 

    await page.click('button[type="submit"]'); 
    const passwordError = await page.locator('text="Mật khẩu không được vượt quá 50 ký tự"');
    await expect(passwordError).toBeVisible();
    await expect(passwordError).toHaveText('Mật khẩu không được vượt quá 50 ký tự'); 
  });

  test('Đăng nhập thành công', async ({ page }) => {
    await page.goto('https://scity.innovation.com.vn/login'); 
    await expect(page).toHaveURL(/login/); 

    await page.fill('input[name="username"]', 'tenant'); 
    await page.fill('input[name="password"]', '12345678x@X'); 
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/scity.innovation.com.vn/);
  });

  test('Có thể "Hiện/Ẩn" mật khẩu khi nhấn vào button "Hiện/Ẩn"', async ({ page }) => {
    await page.goto('https://scity.innovation.com.vn/login'); 
    const passwordInput = page.locator('input[name="password"]'); 
    await passwordInput.fill('12345678x@X');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  
    const toggleButton = page.locator('svg.cursor-pointer'); 
    await toggleButton.click();
  
    await expect(passwordInput).toHaveAttribute('type', 'text');
  

    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
});