import { chromium } from 'playwright';
import { LedMatrix } from '../src';
import { matrixOptions, runtimeOptions } from './_config';
import { Params } from './lifegame/Params';
import { CAMain } from './lifegame/lifegame/CAMain';

const wait = (t: number) => new Promise(ok => setTimeout(ok, t));

// 接続数を取得する関数
const getNumConnect = async (page: any): Promise<number> => {
  try {
    // ページから接続数を取得するためのセレクタを指定
    const numConnect = await page.$eval('#numConnect', (el: any) =>
      parseInt(el.textContent, 10)
    );
    console.log('Connection count:', numConnect);
    return numConnect;
  } catch (error) {
    console.error('Error fetching connection count:', error);
    return 1; // エラーが発生した場合のデフォルト値
  }
};

(async () => {
  try {
    const executablePath = '/usr/bin/chromium-browser';
    const browser = await chromium.launch({
      executablePath: executablePath,
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto('https://p2p-next-app.vercel.app/');

    const matrix = new LedMatrix(matrixOptions, runtimeOptions);

    Params.init(0);
    const ca: any = new CAMain();

    let numConnect = 1; // デフォルトの接続数で初期化
    let lastUpdateTime = Date.now(); // 最後の更新時間を記録

    // 無限ループ
    while (true) {
      const currentTime = Date.now();

      // 最後の更新から5秒経過したかをチェック
      if (currentTime - lastUpdateTime >= 5000) {
        numConnect = await getNumConnect(page)
        lastUpdateTime = currentTime;
      }

      matrix.sync();
      ca.update(numConnect);

      matrix
        .clear() // clear the display
        .drawBuffer(ca._output, 64, 64);

      await wait(30);
    }
  } catch (error) {
    console.error(`${__filename} caught: `, error);
  }
})();
