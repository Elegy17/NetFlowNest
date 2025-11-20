#!/bin/bash
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
CYAN='\033[1;36m'
RESET='\033[0m'
LAUNCHER_URL="https://raw.githubusercontent.com/Hyson-9527/zy-fx-mcs/main/michangsheng.sh"

# 强制创建目标目录，避免路径不存在报错
mkdir -p "$HOME/personal-website/觅长生"

echo -e "${GREEN}感应到传法神符，开始接引道法…${RESET}"
echo
echo -e "${CYAN}为得其所，望道友引其来路…${RESET}"
# 修复read命令引号格式，避免语法解析异常
read -p "$(echo -e ${CYAN}'请告知仙府之径: '${RESET})" user_game_dir

# 修复空值判断逻辑，确保语法正确
if [ -z "$user_game_dir" ]; then
  user_game_dir="/路径未寻，待君另辟洞天…/"
  echo -e "${YELLOW}寻路未果，暂居他处，道友可往天机策再寻仙府之径…${RESET}"
fi

echo -e "${YELLOW}灵符已动，传法之机悄然开启…${RESET}"
# 硬编码下载路径，无变量，避免解析错误
curl -o "$HOME/personal-website/觅长生/michangsheng.sh" "$LAUNCHER_URL"

echo -e "${YELLOW}接引其身…${RESET}"
# 直接指定文件路径添加执行权限
chmod +x "$HOME/personal-website/觅长生/michangsheng.sh"

echo -e "${YELLOW}存此天机…${RESET}"
# 修复配置文件写入引号，确保变量正确解析
echo "GAME_DIR='$user_game_dir'" >"$HOME/personal-website/觅长生/tianjice.conf"
echo "GAME_PORT='8001'" >>"$HOME/personal-website/觅长生/tianjice.conf"

echo -e "${GREEN}传法既成，灵机已备！${RESET}"
echo -e "${GREEN}所有文件已安装至：$HOME/personal-website/觅长生 ${RESET}"
echo -e "${GREEN}手动执行命令：cd $HOME/personal-website/觅长生 && bash michangsheng.sh 即可启动！${RESET}"
