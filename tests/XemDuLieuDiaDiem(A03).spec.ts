import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Bước 1: Đăng nhập vào tài khoản Admin
    await page.goto('https://scity.innovation.com.vn/login'); // Thay 'URL_CỦA_TRANG_ADMIN' bằng URL thực tế của trang
    await page.fill('input[name="username"]', 'tenant'); // Thay 'USERNAME' bằng tên đăng nhập
    await page.fill('input[name="password"]', '12345678x@X'); // Thay 'PASSWORD' bằng mật khẩu
    await page.click('button[type="submit"]'); // Giả sử nút đăng nhập là button submit
    await expect(page).toHaveURL(/scity.innovation.com.vn/); // Kiểm tra điều hướng thành công tới trang sau đăng nhập

    // Bước 2: Truy cập vào trang "Quản lý địa điểm"
    const locationBtn = page.locator('button[aria-label="Quản lý địa điểm"]');
    await locationBtn.click();
    await expect(page).toHaveURL(/location/);
  });

test('Test 1: Có thể đóng cửa sổ "Thông tin địa điểm" khi nhấn dấu "X"', async ({ page }) => {
    const rowDrop = page.locator('//*[@id="action-button"]/div[2]').first();
    await rowDrop.click();

    const infoChoice = page.locator('//*[@id="action-menu"]/div[3]/ul/li[1]');
    await infoChoice.click();

    await expect(page.locator('body > div.MuiDialog-root.MuiModal-root.css-3fbk3z > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div')).toBeVisible();

    const closeIc = page.locator('.MuiDialog-paper .cursor-pointer');
    await closeIc.click();

    await expect(page.locator('body > div.MuiDialog-root.MuiModal-root.css-3fbk3z > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div')).toBeHidden();
});

test('Test 2: Có thể xem "Thông tin địa điểm"', async ({ page }) => {
    const rowDrop = page.locator('//*[@id="action-button"]/div[2]').first();
    await rowDrop.click();

    const infoChoice = page.locator('//*[@id="action-menu"]/div[3]/ul/li[1]');
    await infoChoice.click();

    await expect(page.locator('body > div.MuiDialog-root.MuiModal-root.css-3fbk3z > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div')).toBeVisible();
});

test('Test 3: Số lượng địa điểm hiển thị đúng với lựa chọn', async ({page}) => {
    const itemsPerPage = [30, 50, 100];

  itemsPerPage.forEach((count) => {
    test(`Kiểm tra hiển thị ${count} địa điểm trên mỗi trang`, async ({ page }) => {
      // Chọn số lượng địa điểm hiển thị
      await page.selectOption('select#items-per-page', `${count}`); // Thay 'select#items-per-page' bằng selector của dropdown số lượng hiển thị

      // Đợi danh sách địa điểm cập nhật sau khi thay đổi lựa chọn
      await page.waitForTimeout(1000); // Đợi cập nhật (tùy chỉnh nếu có cơ chế cập nhật khác)

      // Kiểm tra số lượng địa điểm hiển thị trên trang
      const items = await page.$$('selector-của-địa-điểm-trên-trang'); // Thay 'selector-của-địa-điểm-trên-trang' bằng selector cho mỗi mục địa điểm
      expect(items.length).toBeLessThanOrEqual(count); // Kiểm tra số lượng hiển thị không vượt quá lựa chọn
    });
  });
});

