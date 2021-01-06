class RegistrationPage
{
    FirstNameTxt = "//input[@name='first_name']";
    LastNameTxt = "//input[@name='last_name']";
    EmailTxt = "//input[@name='email']";
    PasswordTxt = "#pwd1";
    ConfirmPasswordTxt = "#pwd2";
    AcceptTermsCheckBox =  "//input[@name='terms']";
    RegisterButton = "#submit_button";
    
    constructor(page) {
        this.page = page;
      }
    
      async Navigate() {
        try {
            await this.page.goto('https://dineshvelhal.github.io/testautomation-playground/register.html');
        } catch (error) {
            console.log(error);
        }
    }

    async Register(firstName, lastName, email, password, confirmPassword, isAcceptTermsToBeChecked = true) {
        try
        {
            await this.page.fill(this.FirstNameTxt, firstName);
            await this.page.fill(this.LastNameTxt, lastName);
            await this.page.fill(this.EmailTxt, email);
            await this.page.fill(this.PasswordTxt, password);
            await this.page.fill(this.ConfirmPasswordTxt, confirmPassword);
            if(isAcceptTermsToBeChecked) {
                await this.page.click(this.AcceptTermsCheckBox);
            }
            await this.page.click(this.RegisterButton);
         }
        catch(error)
        {
            console.log(error);
        }
    }
    async CheckRegistrationWithValidInput(firstName, lastName, email, password, confirmPassword)
    {
        try {
            await this.Register(firstName, lastName, email, password, confirmPassword);
            await this.page.waitForFunction("document.title === 'Confirmation!'");
            await this.page.waitForSelector("//h1[@class='text-success'][contains(text(), 'Confirmation')]/following::p[contains(text(), 'Form submitted successfully')]");
        } catch (error) {
            console.log(error);
        }
    }
    async CheckPasswordFieldsValidation(firstName, lastName, email, password, confirmPassword) {
        try {
            await this.Register(firstName, lastName, email, password, confirmPassword);
            await this.page.waitForSelector("//span[@id='message'][contains(text(), 'Passwords don't match. Try again!!')]");
        } catch (error) {
            console.log(error);
        }
    }
    async CheckFormFieldsToBeValid(firstName, lastName, email, password, confirmPassword, isAcceptTermsToBeChecked = true) {
        try {
            await this.Register(firstName, lastName, email, password, confirmPassword, isAcceptTermsToBeChecked);
            await this.page.waitForFunction("document.title === 'Register!'");
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = {RegistrationPage};