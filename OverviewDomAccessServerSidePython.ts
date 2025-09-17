import { Locator, Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewDomAccessServerSidePython extends TextbookPage{
  page: Page;

DomAccessSaveRun = 'class="btn btn-success run-button"';
DomAccessCodeOutput = '//*[@id="tftest1_stdout"]';
DomAccessCodeLine = '#tftest1 > div:nth-child(1) > div:nth-child(2)';
DomAccessShowSrcBtn = '//*[@id="tftest1_src_show"]';
DomAccessSrc = '#tftest1_src > div:nth-child(1)';
DomAccessHideSrcBtn = '//*[@id="tftest1_src_hide"]';
DomAccessSliderHandle = '#tftest1 > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)';
DomAccessSliderTrack = '#tftest1 > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)'

SrvSidePythonCodeOutput1 = '//*[@id="pandas_stdout"]';
SrvSidePythonCodeLine1 = '#pandas > div:nth-child(1) > div:nth-child(2)';
SrvSidePythonShowSrcBtn1 = '//*[@id="pandas_src_show"]';
SrvSidePythonSrc1 = '#pandas_src > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)';
SrvSidePythonHideSrcBtn1 = '//*[@id="pandas_src_hide"]';
SrvSidePythonSliderHandle1 = '#pandas > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)';
SrvSidePythonSliderTrack1 = '#pandas > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)';

SrvSidePythonCodeOutput2 = '//*[@id="inherit_cricketfan_stdout"]';
SrvSidePythonCodeLine2 = '#inherit_cricketfan > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)';
SrvSidePythonSliderHandle2 = '#inherit_cricketfan > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)';
SrvSidePythonSliderTrack2 = '#inherit_cricketfan > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)';
SrvSidePythonShowCodeLens = '#inherit_cricketfan > div:nth-child(1) > div:nth-child(1) > button:nth-child(3)';
SrvSidePythonCodeLens = 'iframe#inherit_cricketfan_codelens';
SrvSidePythonCodeLensViz = '//*[@id="vizLayoutTdFirst"]';
SrvSidePythonHideCodeLens = '#inherit_cricketfan > div:nth-child(1) > div:nth-child(1) > button:nth-child(3)';
SrvSidePythonErrorBox = '//*[@id="inherit_cricketfan_errinfo"]';
SrvSidePythonCodeCoach = '#inherit_cricketfan > div:nth-child(1) > div:nth-child(4)';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

async dragSlider(
    page: Page,
    handletype: string | Locator,
    tracktype: string | Locator,
    from: number,
    to: number
) {
    const handle = typeof handletype === 'string'
    ? page.locator(handletype)
    : handletype;

    const track = typeof tracktype === 'string'
    ? page.locator(tracktype)
    : tracktype;

    await expect(handle).toBeVisible();
    await expect(track).toBeVisible();
    
    const sliderHandle = await handle.boundingBox();
    const sliderTrack = await track.boundingBox();

    if (!sliderHandle || !sliderTrack) {
        throw new Error('not visible');
    }

    // const xHandle = sliderHandle.x + sliderHandle.width / 2;
    const yHandle = sliderHandle.y + sliderHandle.height / 2;

    const trackFrom = sliderTrack.x + (sliderTrack.width * from) / 100;
    const trackTo = sliderTrack.x + (sliderTrack.width * to) / 100;

    await page.mouse.move(trackFrom, yHandle)
    await page.mouse.down();
    await page.mouse.move(trackTo, yHandle, {steps:10})
    await page.mouse.up();
  }

}