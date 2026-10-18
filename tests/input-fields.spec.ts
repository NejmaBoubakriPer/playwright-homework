import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Update Pet Type', async ({page}) => {
//1. Select the PET TYPES menu item in the navigation bar
    await page.getByRole('link', { name: 'Pet Types' }).click();
//2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    await expect(page.locator('h2')).toHaveText('Pet Types');
//3. Click on "Edit" button for the "cat" pet type
    const rows = page.locator('tr');
    const index = await rows.evaluateAll(
        (els) => els.findIndex((el) => el.querySelector('input')?.value === 'cat')
    );
    await rows.nth(index).getByRole('button', { name: 'Edit' }).click();
//4. Add assertion of the "Edit Pet Type" text displayed
    await expect(page.locator('h2')).toHaveText('Edit Pet Type');
//5. Change the pet type name from "cat" to "rabbit" and click "Update" button
    await page.locator('#name').clear();
    await page.locator('#name').fill('rabbit');
    await page.getByRole('button', {name: 'Update'}).click();
//6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
    const firstrow = page.locator('tr', {has: page.getByRole('textbox')}).first();
    await expect(firstrow.getByRole('textbox')).toHaveValue('rabbit');
//7. Click on "Edit" button for the same "rabbit" pet type
    await firstrow.getByRole('button', { name: 'Edit' }).click();
//8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
    await page.locator('#name').clear();
    await page.locator('#name').fill('cat');
    await page.getByRole('button', {name: 'Update'}).click();
//9. Add the assertion that the first pet type in the list of names has a value "cat" 
    await expect(firstrow.getByRole('textbox')).toHaveValue('cat');
});