import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class FormInteractionTest(unittest.TestCase):
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
        time.sleep(1)  # Allow form to transition
    
    def test_field_input_and_clear(self):
        """Test text input and clearing functionality"""
        username = self.driver.find_element(By.NAME, "username")
        
        # Test typing
        test_text = "test_user123"
        username.send_keys(test_text)
        self.assertEqual(username.get_attribute("value"), test_text)
        
        # Test clearing
        username.clear()
        self.assertEqual(username.get_attribute("value"), "")
    
    def test_tab_navigation(self):
        """Test keyboard tab navigation between fields"""
        fields_order = ["username", "email", "password"]
        current_field = self.driver.find_element(By.NAME, fields_order[0])
        
        for field_name in fields_order[1:]:
            current_field.send_keys(Keys.TAB)
            current_field = self.driver.switch_to.active_element
            self.assertEqual(current_field.get_attribute("name"), field_name)
    
    def test_focus_states(self):
        """Test visual focus indicators (screenshot-based verification)"""
        fields = [
            self.driver.find_element(By.NAME, "username"),
            self.driver.find_element(By.NAME, "email"),
            self.driver.find_element(By.NAME, "password")
        ]
        
        for field in fields:
            field.click()
            time.sleep(0.5)  # Visual verification pause
            # Take screenshot for documentation
            self.driver.save_screenshot(f"screenshots/focus_{field.get_attribute('name')}.png")
            
            # Verify focus state via CSS
            focused_style = field.value_of_css_property("border-color")
            self.assertNotEqual(focused_style, "rgba(0, 0, 0, 0)", "No focus indicator visible")
    
    def test_submit_button_state(self):
        """Test submit button enabled/disabled states"""
        submit_btn = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        
        # Initially should be disabled (empty form)
        self.assertFalse(submit_btn.is_enabled(), "Submit button should be disabled for empty form")
        
        # Fill required fields
        self.driver.find_element(By.NAME, "username").send_keys("testuser")
        self.driver.find_element(By.NAME, "email").send_keys("test@example.com")
        self.driver.find_element(By.NAME, "password").send_keys("testpass123")
        
        # Now should be enabled
        self.assertTrue(submit_btn.is_enabled(), "Submit button should be enabled with valid form")
    
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()