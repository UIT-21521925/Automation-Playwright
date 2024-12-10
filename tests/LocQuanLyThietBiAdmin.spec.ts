import { test, expect } from '@playwright/test';

test('Có thể lọc thiết bị theo trường lọc "Địa điểm" (không có kết quả)', async ({ page }) => {
  await page.goto('https://scity.innovation.com.vn/login');
  await expect(page).toHaveURL(/login/);
  await page.fill('input[name="username"]', 'tenant');
  await page.fill('input[name="password"]', '12345678x@X');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/scity.innovation.com.vn/);

  const deviceBtn = page.locator('button[aria-label="Quản lý thiết bị"]');
  await deviceBtn.click();
  await expect(page).toHaveURL(/device/);

  await page.click('text="Bộ lọc"');
  const locationDrop = page.locator('.MuiSelect-select.MuiSelect-outlined').first();
  await locationDrop.click();

  const listItem = page.locator('li:has-text("TMA Building")').first();
  await listItem.click();


  const filteredDeviceList = await page.locator('.MuiDataGrid-row').allTextContents();

  if (filteredDeviceList.length > 0) {
    for (const device of filteredDeviceList) {
      expect(device).toContain('TMA Building');
    }
  } else {
    const noDataMessage = await page.locator('text="Không có kết quả tìm kiếm phù hợp"').isVisible();
    expect(noDataMessage).toBeTruthy();
  }
});

test('Có thể lọc thiết bị theo trường lọc "Địa điểm"(có kết quả)', async ({ page }) => {

  await page.goto('https://scity.innovation.com.vn/login');
  await expect(page).toHaveURL(/login/);
  await page.fill('input[name="username"]', 'tenant');
  await page.fill('input[name="password"]', '12345678x@X');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/scity.innovation.com.vn/);

  const deviceBtn = page.locator('button[aria-label="Quản lý thiết bị"]');
  await deviceBtn.click();
  await expect(page).toHaveURL(/device/);

  await page.click('text="Bộ lọc"');
  const locationDrop = page.locator('.MuiSelect-select.MuiSelect-outlined').first();
  await locationDrop.click();

  const listItem = page.locator('li:has-text("Chateau Villa")').first();
  await listItem.click();


  const filteredDeviceList = await page.locator('.MuiDataGrid-row').allTextContents();

  if (filteredDeviceList.length > 0) {
    for (const device of filteredDeviceList) {
      expect(device).toContain('Chateau Villa');
    }
  } else {
    const noDataMessage = await page.locator('text="Không có kết quả tìm kiếm phù hợp"').isVisible();
    expect(noDataMessage).toBeTruthy();
  }
});
