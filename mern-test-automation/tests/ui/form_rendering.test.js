import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class FormRenderingTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.implicitly_wait(10)
        cls.base_url = "http://localhost:3000"
    
    def test_ui_001_form_rendering(self):
        """UI-001: Verify registration form renders correctly with all required fields"""
        self.driver.get(self.base_url)
        
        # Switch to register form
        switch_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Need to register?')]")
        switch_btn.click()
        
        # Verify all form elements are present and visible
        form_elements = {
            "username_field": (By.NAME, "username"),
            "email_field": (By.NAME, "email"),
            "password_field": (By.NAME, "password"),
            "submit_button": (By.XPATH, "//button[@type='submit']")
        }
        
        for element_name, locator in form_elements.items():
            element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located(locator)
            self.assertTrue(element.is_displayed(), f"{element_name} is not displayed")
        
        # Verify labels
        labels = {
            "Username": "username",
            "Email": "email",
            "Password": "password"
        }
        
        for label_text, field_id in labels.items():
            label = self.driver.find_element(By.XPATH, f"//label[contains(., '{label_text}')]")
            self.assertTrue(label.is_displayed(), f"Label '{label_text}' not found")
            associated_field = label.find_element(By.XPATH, f".//following-sibling::input[@name='{field_id}']")
            self.assertTrue(associated_field.is_displayed(), f"Field for '{label_text}' not properly associated")
    
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()