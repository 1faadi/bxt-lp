import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve("public/sites/cogentlabs-co-edeb5c95/case-studies-cecbd40a");
const assets = [
  ["petsfirst.png", "https://cdn.sanity.io/images/2n09zsmh/production/9a93e0648f77f5305493cd69bc98e4d2744f686d-1536x1024.png?w=960&h=600&fit=crop"],
  ["paradigm.png", "https://cdn.sanity.io/images/2n09zsmh/production/e237dc3566acdca0291f1a7240538ff4bfd4d193-1672x941.png?w=960&h=600&fit=crop"],
  ["mkparalegal.png", "https://cdn.sanity.io/images/2n09zsmh/production/f2def7b69a462d311333f078de1578848787d7e7-1536x1024.png?w=960&h=600&fit=crop"],
  ["hill-content.png", "https://cdn.sanity.io/images/2n09zsmh/production/8179201b244f0c6777b6abb4d1eff7ba2d4358e9-1672x941.png?w=960&h=600&fit=crop"],
  ["hill-research.png", "https://cdn.sanity.io/images/2n09zsmh/production/53d4badd52eca7e9e319ff24780458240b8cba61-1672x941.png?w=960&h=600&fit=crop"],
  ["friendlypaws.png", "https://cdn.sanity.io/images/2n09zsmh/production/9682737ce07ba550f6311142733d765eda95d3f6-1672x941.png?w=960&h=600&fit=crop"],
  ["fine-jewelry.png", "https://cdn.sanity.io/images/2n09zsmh/production/09aa3810096126dcec98c7912197c782c59eb6bb-1491x1055.png?w=960&h=600&fit=crop"],
  ["fg-agent.png", "https://cdn.sanity.io/images/2n09zsmh/production/b55175cd7fdb6f073bbe7bef0b54c758e3ac9360-1672x941.png?w=960&h=600&fit=crop"],
  ["elmstreet.png", "https://cdn.sanity.io/images/2n09zsmh/production/c8f8699b1481e142bc1fd11d2c8ba9d961855913-1672x941.png?w=960&h=600&fit=crop"],
];

await mkdir(outputDir, { recursive: true });

for (const [fileName, url] of assets) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${fileName}: ${response.status}`);
  await writeFile(resolve(outputDir, fileName), Buffer.from(await response.arrayBuffer()));
}
