class LoginPage
{
    UsernameTxt = '#user';
    PasswordTxt = '#password';
    LoginButton = '#login';
    
    constructor(page) {
        this.page = page;
      }
    
      async Navigate() {
        try {
            await this.page.goto('https://dineshvelhal.github.io/testautomation-playground/login.html');
        } catch (error) {
            console.log(error);
        }
    }

    async Login(userName, password) {
        try
        {
            await this.page.fill(this.UsernameTxt, userName);
            await this.page.fill(this.PasswordTxt, password);
            await this.page.click(this.LoginButton);
         }
        catch(error)
        {
            console.log(error);
        }
    }
    async CheckLoginWithValidInput(userName, password){
        try {
            this.Login(userName, password);
            await this.page.waitForFunction("document.title === 'Confirmation!'");
            await this.page.waitForSelector("//h1[@class='text-success'][contains(text(), 'Confirmation')]/following::p[contains(text(), 'Form submitted successfully')]");
        } catch (error) {
            console.log(error);
        }
    }
    async CheckLoginFieldsToBeValid(userName, password){
        try {
            this.LoginButton(userName, password);
            if(userName == null || password == null) {
                await this.page.waitForFunction("document.title === 'Login'");
            }
            else if(userName !== 'admin' || password !== 'admin'){
                await this.page.waitForSelector("//span[@id='message'][contains(text(), 'Incorrect username or password. Try again!!')]");
            }
        } catch (error) {
            console.log(error);
        }
    }
    
}
module.exports = {LoginPage};