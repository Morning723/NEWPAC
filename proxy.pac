function FindProxyForURL(url, host) {
    // 1. 无点域名或本地回环标识直连
    if (isPlainHostName(host) || host === "localhost" || shExpMatch(host, "*.local")) {
        return "DIRECT";
    }

    // 2. 本地回环与内网 IPv4 地址段匹配（纯字符串比对，零延时）
    if (shExpMatch(host, "127.*") ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "192.168.*") ||
        shExpMatch(host, "172.16.*") ||
        shExpMatch(host, "172.17.*") ||
        shExpMatch(host, "172.18.*") ||
        shExpMatch(host, "172.19.*") ||
        shExpMatch(host, "172.2?.*") ||
        shExpMatch(host, "172.30.*") ||
        shExpMatch(host, "172.31.*")) {
        return "DIRECT";
    }

    // 3. 核心路由与容灾：PC 开机走代理，PC 关机由系统底层自动回退直连
    return "PROXY 192.168.10.5:7897; DIRECT";
}
