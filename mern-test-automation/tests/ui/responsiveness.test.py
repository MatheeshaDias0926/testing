import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class ResponsivenessTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.base_url = "http://localhost:3000"
        cls.screen_sizes = {
            "desktop": (1920, 1080),
            "tablet": (768, 1024),
            "mobile": (375, 812)
        }
    
    def test_ui_responsiveness(self):
        """Test form renders correctly on different screen sizes"""
        for device, size in self.screen_sizes.items():
            with self.subTest(device=device):
                self.driver.set_window_size(*size)
                self.driver.get(self.base_url)
                
                # Switch to register form
                switch_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Need to register?')]")
                switch_btn.click()
                
                # Verify form container is visible and properly sized
                form_container = WebDriverWait(self.driver, 10).until(
                    EC.visibility_of_element_located((By.CSS_SELECTOR, "form"))
                
                # Take screenshot for documentation
                self.driver.save_screenshot(f"screenshots/{device}_view.png")
                
                # Verify form fits within viewport
                form_width = form_container.size['width']
                viewport_width = self.driver.execute_script("return window.innerWidth;")
                self.assertLess(form_width, viewport_width, 
                               f"Form doesn't fit {device} viewport")
    
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main()