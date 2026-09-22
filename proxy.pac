function FindProxyForURL(url, host) {
    // 采用纯字符串前缀匹配，完全剥离 dnsResolve() 阻塞调用
    // 匹配局域网无后缀主机名及所有私有 IP 协议段
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        shExpMatch(host, "127.*") ||
        shExpMatch(host, "192.168.*") ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "172.16.*") ||
        shExpMatch(host, "172.17.*") ||
        shExpMatch(host, "172.18.*") ||
        shExpMatch(host, "172.19.*") ||
        shExpMatch(host, "172.2?.*") ||
        shExpMatch(host, "172.30.*") ||
        shExpMatch(host, "172.31.*")) {
        return "DIRECT";
    }

    // 毫秒级返回：首选局域网代理，失败立刻直连
    return "PROXY 192.168.10.5:7897; DIRECT";
}