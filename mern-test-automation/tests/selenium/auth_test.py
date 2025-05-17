from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest
import time

class AuthUITests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.implicitly_wait(10)
        cls.base_url = "http://localhost:3000"
        
    def test_ui_001_form_rendering(self):
        """UI-001: Verify registration form renders correctly"""
        self.driver.get(self.base_url)
        
        # Switch to register form
        switch_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Need to register?')]")
        switch_btn.click()
        
        # Verify all form elements
        username = self.driver.find_element(By.NAME, "username")
        email = self.driver.find_element(By.NAME, "email")
        password = self.driver.find_element(By.NAME, "password")
        submit = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        
        self.assertTrue(username.is_displayed())
        self.assertTrue(email.is_displayed())
        self.assertTrue(password.is_displayed())
        self.assertTrue(submit.is_displayed())
        
    def test_ui_002_form_interaction(self):
        """UI-002: Verify form interactions"""
        self.driver.get(self.base_url)
        
        # Switch to register form
        switch_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Need to register?')]")
        switch_btn.click()
        
        # Test field interactions
        username = self.driver.find_element(By.NAME, "username")
        email = self.driver.find_element(By.NAME, "email")
        password = self.driver.find_element(By.NAME, "password")
        
        # Test typing and clearing
        username.send_keys("test input")
        self.assertEqual(username.get_attribute("value"), "test input")
        username.clear()
        self.assertEqual(username.get_attribute("value"), "")
        
        # Test tab navigation
        username.send_keys("a")
        username.send_keys(Keys.TAB)
        self.assertTrue(self.driver.switch_to.active_element == email)
        
        # Test focus states (visual verification)
        self.driver.execute_script("arguments[0].focus();", username)
        time.sleep(1)  # For visual verification
        self.driver.execute_script("arguments[0].focus();", email)
        time.sleep(1)
        
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()