import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class ErrorDisplayTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.implicitly_wait(10)
        cls.base_url = "http://localhost:3000"
    
    def setUp(self):
        self.driver.get(self.base_url)
        # Switch to register form
        switch_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Need to register?')]")
        switch_btn.click()
        time.sleep(1)
    
    def test_empty_submission_errors(self):
        """Test error messages for empty form submission"""
        submit_btn = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_btn.click()
        
        # Verify error messages appear for all required fields
        error_messages = self.driver.find_elements(By.CSS_SELECTOR, ".error-message")
        self.assertGreaterEqual(len(error_messages), 3, "Not all required field errors displayed")
        
        # Verify each error message is near its field
        for field in ["username", "email", "password"]:
            field_element = self.driver.find_element(By.NAME, field)
            error = field_element.find_element(By.XPATH, "./following-sibling::div[contains(@class, 'error-message')]")
            self.assertTrue(error.is_displayed(), f"No error shown for {field}")
    
    def test_invalid_email_error(self):
        """Test error message for invalid email format"""
        email_field = self.driver.find_element(By.NAME, "email")
        email_field.send_keys("invalid-email")
        
        submit_btn = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_btn.click()
        
        email_error = self.driver.find_element(By.XPATH, "//input[@name='email']/following-sibling::div[contains(@class, 'error-message')]")
        self.assertTrue(email_error.is_displayed())
        self.assertIn("valid email", email_error.text.lower())
    
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()