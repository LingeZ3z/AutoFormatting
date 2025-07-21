import fs from 'fs';
import util from 'util';

const cfgsrc = fs.readFileSync('config.json');
const cfg = JSON.parse(cfgsrc);

let os = "";

os += util.format("![](%s)\n\n", cfg.imgurl);

os += "# 往期链接\n\n";
cfg.links.forEach((e, i) => {
    os += util.format("[第 %d 期](%s)\n\n", i + 1, e);
});

os += "# Tips\n\n";
os += fs.readFileSync('templates/tips.md');
os += "\n\n";

os += "# 广告\n\n";
cfg.ads.forEach((e, i) => {
    os += util.format("**%d**\n\n", i + 1);
    os += fs.readFileSync('ads/' + e);
    os += "\n\n";
})

let authors = "";
cfg.articles.forEach((e, i) => {
    os += util.format("# %s\n\n", e.title);
    os += util.format("**作者/%s**\n\n", e.author);
    os += fs.readFileSync('articles/' + e.path);
    os += "\n\n";
    if(i > 0) authors += "、";
    authors += e.author;
});

os += "# 编辑后记\n\n";
os += fs.readFileSync('templates/ends.md');
os += "\n\n";

os += "# 致谢\n\n";
os += util.format(fs.readFileSync('templates/thanks.md').toString(), authors);

fs.writeFileSync('generated.md', os);