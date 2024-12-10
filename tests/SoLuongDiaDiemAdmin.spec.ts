import { test, expect } from '@playwright/test';

test.describe('Kiểm tra số lượng địa điểm hiển thị trên trang "Quản lý địa điểm"', () => {
  test.beforeEach(async ({ page }) => {
    // Bước 1: Đăng nhập vào tài khoản Admin
    await page.goto('https://scity.innovation.com.vn/login'); // Thay 'URL_CỦA_TRANG_ADMIN' bằng URL thực tế của trang
    await page.fill('input[name="username"]', 'tenant'); // Thay 'USERNAME' bằng tên đăng nhập
    await page.fill('input[name="password"]', '12345678x@X'); // Thay 'PASSWORD' bằng mật khẩu
    await page.click('button[type="submit"]'); // Giả sử nút đăng nhập là button submit
    await expect(page).toHaveURL(/scity.innovation.com.vn/); // Kiểm tra điều hướng thành công tới trang sau đăng nhập

    // Bước 2: Truy cập vào trang "Quản lý địa điểm"
    await page.click('text="Quản lý địa điểm"'); // Thay selector để tìm đúng mục "Quản lý địa điểm" trong menu
    await expect(page).toHaveURL(/locations/); // Kiểm tra điều hướng tới trang "Quản lý địa điểm"
  });

  // Bước 3: Kiểm tra số lượng địa điểm hiển thị tương ứng với lựa chọn
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
