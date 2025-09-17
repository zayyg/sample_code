import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/signupPage";
import { OverviewDomAccessServerSidePython } from "../pages/TextbookPages/OverviewDomAccessServerSidePython";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewDomAccessServerSidePython(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/python.html')
});

test.describe('1.7 DOM Access', () => {
    test('Clicking Save & Run button runs code which shows the value in the text entry box', async ({ page }) => {
        let textbookPage = new OverviewDomAccessServerSidePython(page);

        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(7).click();
        await expect(page.locator(textbookPage.DomAccessCodeOutput)).toBeVisible();
        await expect(page.locator(textbookPage.DomAccessCodeOutput)).toContainText('value = example input');

    });
    
    test('Changing text in the print line', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await textbookPage.changeCodeMirrorLine(
        `print('value = ', t.value)`,
        `print('value = test', t.value)`
        );
    
        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(7).click();
            
        await expect(page.locator(textbookPage.DomAccessCodeOutput)).toBeVisible();
        await expect(page.locator(textbookPage.DomAccessCodeOutput)).toContainText('value = test example input');
    
    });

    test('Clicking the Show Source button shows the source', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await page.locator(textbookPage.DomAccessShowSrcBtn).click();
        await expect(page.locator(textbookPage.DomAccessSrc)).toBeVisible();
        await expect(page.locator(textbookPage.DomAccessSrc)).toContainText('activecode:: tftest1');
        await expect(page.locator(textbookPage.DomAccessSrc)).toContainText(':nocodelens:');
        await expect(page.locator(textbookPage.DomAccessHideSrcBtn)).toBeVisible();

    });

    test('Clicking the Hide Source button hides the source', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await page.locator(textbookPage.DomAccessShowSrcBtn).click();
        await expect(page.locator(textbookPage.DomAccessSrc)).toBeVisible();
        await expect(page.locator(textbookPage.DomAccessHideSrcBtn)).toBeVisible();
        await expect(page.locator(textbookPage.DomAccessSrc)).toContainText('activecode:: tftest1');
        await expect(page.locator(textbookPage.DomAccessSrc)).toContainText(':nocodelens:');

        await page.locator(textbookPage.DomAccessHideSrcBtn).click();
        await expect(page.locator(textbookPage.DomAccessSrc)).not.toBeVisible();
        await expect(page.locator(textbookPage.DomAccessShowSrcBtn)).toBeVisible();

    });

    test('Slider changes code back to initial state and go back to current state', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await textbookPage.changeCodeMirrorLine(
        `print('value = ', t.value)`,
        `print('value = test', t.value)`
        );
    
        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(7).click();
            
        await expect(page.locator(textbookPage.DomAccessCodeOutput)).toBeVisible();
        await expect(page.locator(textbookPage.DomAccessCodeOutput)).toContainText('value = test example input');

        await textbookPage.changeCodeMirrorLine(
        `print('value = test', t.value)`,
        `print('value = testing', t.value)`
        );
    
        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(7).click();
            
        await expect(page.locator(textbookPage.DomAccessCodeOutput)).toBeVisible();
        await expect(page.locator(textbookPage.DomAccessCodeOutput)).toContainText('value = testing example input');


        await textbookPage.dragSlider(page, textbookPage.DomAccessSliderHandle, textbookPage.DomAccessSliderTrack, 100, 50);
        await expect(page.locator(textbookPage.DomAccessCodeLine)).toContainText("print('value = test', t.value)");

        await textbookPage.dragSlider(page, textbookPage.DomAccessSliderHandle, textbookPage.DomAccessSliderTrack, 50, 0);
        await expect(page.locator(textbookPage.DomAccessCodeLine)).toContainText("print('value = ', t.value)");

        await textbookPage.dragSlider(page, textbookPage.DomAccessSliderHandle, textbookPage.DomAccessSliderTrack, 0, 50);
        await expect(page.locator(textbookPage.DomAccessCodeLine)).toContainText("print('value = test', t.value)");

        await textbookPage.dragSlider(page, textbookPage.DomAccessSliderHandle, textbookPage.DomAccessSliderTrack, 50, 100);
        await expect(page.locator(textbookPage.DomAccessCodeLine)).toContainText("print('value = testing', t.value)");


    });

});

test.describe('1.8 Server Side Python (1/2)', () => {
    test('Clicking Save & Run button runs code and shows the csv file as a more legible table', async ({ page }) => {
        let textbookPage = new OverviewDomAccessServerSidePython(page);
        
        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(8).click();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('Country');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('0      Afghanistan');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('1         Albania');

    });

    test('Changing text in the print line', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await textbookPage.changeCodeMirrorLine(
        `print(df.head())`,
        `print(df.tail())`
        );
    
        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(8).click();
            
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('Country');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('219  Wallis and Futuna');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('220     Western Sahara');
    
    });

    test('Clicking the Show Source button shows the source', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await page.locator(textbookPage.SrvSidePythonShowSrcBtn1).click();
        await expect(page.locator(textbookPage.SrvSidePythonSrc1)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonSrc1)).toContainText('.. activecode:: pandas');
        await expect(page.locator(textbookPage.SrvSidePythonSrc1)).toContainText(':language: python3');
        await expect(page.locator(textbookPage.SrvSidePythonHideSrcBtn1)).toBeVisible();

    });

    test('Clicking the Hide Source button hides the source', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await page.locator(textbookPage.SrvSidePythonShowSrcBtn1).click();
        await expect(page.locator(textbookPage.SrvSidePythonSrc1)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonSrc1)).toContainText('.. activecode:: pandas');
        await expect(page.locator(textbookPage.SrvSidePythonSrc1)).toContainText(':language: python3');
        await expect(page.locator(textbookPage.SrvSidePythonHideSrcBtn1)).toBeVisible();

        await page.locator(textbookPage.SrvSidePythonHideSrcBtn1).click();
        await expect(page.locator(textbookPage.SrvSidePythonSrc1)).not.toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonShowSrcBtn1)).toBeVisible();

    });

    test('Slider changes code back to initial state and go back to current state', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await textbookPage.changeCodeMirrorLine(
        `print(df.head())`,
        `print(df.tail())`
        );
    
        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(8).click();
            
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('Country');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('219  Wallis and Futuna');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('220     Western Sahara');

        await textbookPage.changeCodeMirrorLine(
        `print(df.tail())`,
        `print(df.head())`
        );
    
        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(8).click();
            
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('Country');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('0      Afghanistan');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput1)).toContainText('1         Albania');

        await textbookPage.dragSlider(page, textbookPage.SrvSidePythonSliderHandle1, textbookPage.SrvSidePythonSliderTrack1, 100, 50);
        await expect(page.locator(textbookPage.SrvSidePythonCodeLine1)).toContainText("print(df.tail())");

        await textbookPage.dragSlider(page, textbookPage.SrvSidePythonSliderHandle1, textbookPage.SrvSidePythonSliderTrack1, 50, 0);
        await expect(page.locator(textbookPage.SrvSidePythonCodeLine1)).toContainText("print(df.head())");

        await textbookPage.dragSlider(page, textbookPage.SrvSidePythonSliderHandle1, textbookPage.SrvSidePythonSliderTrack1, 0, 50);
        await expect(page.locator(textbookPage.SrvSidePythonCodeLine1)).toContainText("print(df.tail())");

        await textbookPage.dragSlider(page, textbookPage.SrvSidePythonSliderHandle1, textbookPage.SrvSidePythonSliderTrack1, 50, 100);
        await expect(page.locator(textbookPage.SrvSidePythonCodeLine1)).toContainText("print(df.head())");
    
    });

});

test.describe('1.8 Server Side Python (2/2)', () => {
    test('Clicking Save & Run button runs code which shows the output of the code in the output box', async ({ page }) => {
        let textbookPage = new OverviewDomAccessServerSidePython(page);

        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(9).click();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Sally constructed');
    
    });

    test('Clicking Save & Run button runs code and shows an error info box', async ({ page }) => {
        let textbookPage = new OverviewDomAccessServerSidePython(page);

        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(9).click();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Sally constructed');

        await expect(page.locator(textbookPage.SrvSidePythonErrorBox)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonErrorBox)).toContainText('Error');
        await expect(page.locator(textbookPage.SrvSidePythonErrorBox)).toContainText("TypeError: party() missing 1 required argument: 'x' on line 11");
    
    });

    test('Changing text in the print line', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await textbookPage.changeCodeMirrorLine(
        `s = PartyAnimal("Sally")`,
        `s = PartyAnimal("Wally")`
        );

        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(9).click();
            
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Wally constructed');

    });

    test('Changing text in the print line to an incorrect thing makes the code coach box appear', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await textbookPage.changeCodeMirrorLine(
        `self.party()`,
        `self.party(x)`
        );

        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(9).click();

        await expect(page.locator(textbookPage.SrvSidePythonCodeCoach)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeCoach)).toContainText("Line7: undefined name 'x'");
            
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Sally constructed');


    });

    test('Changing text in the print line to the correct thing makes the error box disappear', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await textbookPage.changeCodeMirrorLine(
        `self.party()`,
        `self.party(1)`
        );

        await textbookPage.changeCodeMirrorLine(
        `s.party()`,
        `s.party(2)`
        );

        await textbookPage.changeCodeMirrorLine(
        `j.party()`,
        `j.party(3)`
        );
    
        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(9).click();
            
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Sally constructed');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Sally party count 3');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Jim constructed');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Jim party count 4');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Jim party count 2');
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Jim points 6');

        await expect(page.locator(textbookPage.SrvSidePythonErrorBox)).not.toBeVisible();

    });

    test('Slider changes code back to initial state and go back to current state', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await textbookPage.changeCodeMirrorLine(
        `s = PartyAnimal("Sally")`,
        `s = PartyAnimal("Wally")`
        );

        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(9).click();
            
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Wally constructed');

        await textbookPage.changeCodeMirrorLine(
        `s = PartyAnimal("Wally")`,
        `s = PartyAnimal("Ally")`
        );

        await page.locator('//button[normalize-space(text())="Save & Run"]').nth(9).click();
            
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonCodeOutput2)).toContainText('Ally constructed');

        await textbookPage.dragSlider(page, textbookPage.SrvSidePythonSliderHandle2, textbookPage.SrvSidePythonSliderTrack2, 100, 50);
        await expect(page.locator(textbookPage.SrvSidePythonCodeLine2)).toContainText('s = PartyAnimal("Wally")');

        await textbookPage.dragSlider(page, textbookPage.SrvSidePythonSliderHandle2, textbookPage.SrvSidePythonSliderTrack2, 50, 0);
        await expect(page.locator(textbookPage.SrvSidePythonCodeLine2)).toContainText('s = PartyAnimal("Sally")');

        await textbookPage.dragSlider(page, textbookPage.SrvSidePythonSliderHandle2, textbookPage.SrvSidePythonSliderTrack2, 0, 50);
        await expect(page.locator(textbookPage.SrvSidePythonCodeLine2)).toContainText('s = PartyAnimal("Wally")');

        await textbookPage.dragSlider(page, textbookPage.SrvSidePythonSliderHandle2, textbookPage.SrvSidePythonSliderTrack2, 50, 100);
        await expect(page.locator(textbookPage.SrvSidePythonCodeLine2)).toContainText('s = PartyAnimal("Ally")');
    
    });

    test('Clicking the Show CodeLens button shows the visualizer', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await page.locator(textbookPage.SrvSidePythonShowCodeLens).click();
        await expect(page.locator(textbookPage.SrvSidePythonCodeLens)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonHideCodeLens)).toBeVisible();

        const iFrameBox = page.frameLocator(textbookPage.SrvSidePythonCodeLens);
        await expect(iFrameBox.locator('text=from party import PartyAnimal')).toBeVisible();
        await expect(iFrameBox.locator('text=class CricketFan(PartyAnimal):')).toBeVisible();

    });

    test('Clicking the Hide CodeLens button hides the visualizer', async ({page}) => {
            let textbookPage = new OverviewDomAccessServerSidePython(page);

        await page.locator(textbookPage.SrvSidePythonShowCodeLens).click();
        await expect(page.locator(textbookPage.SrvSidePythonCodeLens)).toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonHideCodeLens)).toBeVisible();

        const iFrameBox = page.frameLocator(textbookPage.SrvSidePythonCodeLens);
        await expect(iFrameBox.locator('text=from party import PartyAnimal')).toBeVisible();
        await expect(iFrameBox.locator('text=class CricketFan(PartyAnimal):')).toBeVisible();

        await page.locator(textbookPage.SrvSidePythonHideCodeLens).click();
        await expect(page.locator(textbookPage.SrvSidePythonCodeLens)).not.toBeVisible();
        await expect(page.locator(textbookPage.SrvSidePythonShowCodeLens)).toBeVisible();

    });

});