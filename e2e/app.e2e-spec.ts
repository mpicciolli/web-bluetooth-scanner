import { WebBluetoothScannerPage } from './app.po';

describe('web-bluetooth-scanner App', function() {
  let page: WebBluetoothScannerPage;

  beforeEach(() => {
    page = new WebBluetoothScannerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
