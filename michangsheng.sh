#!/bin/bash
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
CYAN='\033[1;36m'
RESET='\033[0m'

# 配置目标安装目录（home根目录下的personal-website/觅长生）
INSTALL_DIR="$HOME/personal-website/觅长生"
LAUNCHER_URL="https://raw.githubusercontent.com/Hyson-9527/zy-fx-mcs/main/michangsheng.sh"
LAUNCHER_NAME="michangsheng.sh"
CONFIG_FILE="tianjice.conf"

# 创建安装目录（若不存在）
mkdir -p "$INSTALL_DIR"

echo -e "${GREEN}感应到传法神符，开始接引道法…${RESET}"
echo
echo -e "${CYAN}为得其所，望道友引其来路…${RESET}"
read -p "$(echo -e ${CYAN}请告知仙府之径: ${RESET})" user_game_dir

if [ -z "$user_game_dir" ]; then
    user_game_dir="/路径未寻，待君另辟洞天…/"
    echo -e "${YELLOW}寻路未果，暂居他处，道友可往天机策再寻仙府之径…${RESET}"
fi

echo -e "${YELLOW}灵符已动，传法之机悄然开启…${RESET}"
# 下载启动脚本到目标安装目录
curl -o "$INSTALL_DIR/$LAUNCHER_NAME" "$LAUNCHER_URL"

echo -e "${YELLOW}接引其身…${RESET}"
# 给启动脚本添加可执行权限
chmod +x "$INSTALL_DIR/$LAUNCHER_NAME"

echo -e "${YELLOW}存此天机…${RESET}"
# 在目标安装目录创建配置文件
echo "GAME_DIR=\"$user_game_dir\"" > "$INSTALL_DIR/$CONFIG_FILE"
echo "GAME_PORT=\"8001\"" >> "$INSTALL_DIR/$CONFIG_FILE"

echo -e "${GREEN}传法既成，灵机已备！${RESET}"
echo -e "${GREEN}文件已安装至：$INSTALL_DIR ${RESET}"
echo -e "${GREEN}手动执行 $INSTALL_DIR/$LAUNCHER_NAME 即可启动！${RESET}"
