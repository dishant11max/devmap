export const networks = {
  languageSlug: "networks",
  displayName: "Computer Networks",
  nodes: [
    {
      id: "net-01", position: { x: 0, y: 0 }, type: "roadmapNode",
      data: {
        title: "OSI Model",
        description: "Seven layers of network abstraction. Physical to Application — know what happens at each layer.",
        time: "2 hours", status: "pending",
        resources: [
          { type: "video", title: "Computerphile — OSI Model", url: "https://www.youtube.com/watch?v=kCuyS7ihr_E" },
          { type: "doc", title: "Cloudflare — OSI Model", url: "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/" },
        ],
      },
    },
    {
      id: "net-02", position: { x: 0, y: 150 }, type: "roadmapNode",
      data: {
        title: "TCP/IP Stack",
        description: "TCP vs UDP, three-way handshake, flow control, congestion control. The real protocol suite.",
        time: "4 hours", status: "pending",
        resources: [
          { type: "video", title: "Hussein Nasser — TCP", url: "https://www.youtube.com/watch?v=qqRYkcta6IE" },
          { type: "doc", title: "MDN — TCP", url: "https://developer.mozilla.org/en-US/docs/Glossary/TCP" },
        ],
      },
    },
    {
      id: "net-03", position: { x: 0, y: 300 }, type: "roadmapNode",
      data: {
        title: "DNS",
        description: "Domain resolution, DNS hierarchy, caching, record types. How names become IP addresses.",
        time: "2 hours", status: "pending",
        resources: [
          { type: "video", title: "Computerphile — DNS", url: "https://www.youtube.com/watch?v=uOfonONtIuk" },
          { type: "doc", title: "Cloudflare — What is DNS?", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" },
        ],
      },
    },
    {
      id: "net-04", position: { x: 0, y: 450 }, type: "roadmapNode",
      data: {
        title: "HTTP & HTTPS",
        description: "Request/response cycle, methods, status codes, headers. HTTP/1.1, HTTP/2, HTTP/3.",
        time: "4 hours", status: "pending",
        resources: [
          { type: "video", title: "Hussein Nasser — HTTP Crash Course", url: "https://www.youtube.com/watch?v=iYM2zFP3Zn0" },
          { type: "doc", title: "MDN — HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" },
        ],
      },
    },
    {
      id: "net-05", position: { x: 0, y: 600 }, type: "roadmapNode",
      data: {
        title: "TLS/SSL",
        description: "Certificate chains, handshake, symmetric vs asymmetric encryption. How HTTPS actually works.",
        time: "3 hours", status: "pending",
        resources: [
          { type: "video", title: "Computerphile — TLS", url: "https://www.youtube.com/watch?v=0TLDTodL7Lc" },
          { type: "doc", title: "Cloudflare — What is TLS?", url: "https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/" },
        ],
      },
    },
    {
      id: "net-06", position: { x: 0, y: 750 }, type: "roadmapNode",
      data: {
        title: "WebSockets",
        description: "Full-duplex communication, upgrade handshake. Real-time apps: chat, live data, multiplayer.",
        time: "2 hours", status: "pending",
        resources: [
          { type: "video", title: "Hussein Nasser — WebSockets", url: "https://www.youtube.com/watch?v=2Nt-ZrNP22A" },
          { type: "doc", title: "MDN — WebSocket API", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
        ],
      },
    },
    {
      id: "net-07", position: { x: 0, y: 900 }, type: "roadmapNode",
      data: {
        title: "REST vs GraphQL",
        description: "Resource-based vs query-based APIs. Trade-offs, when to use each, real-world patterns.",
        time: "3 hours", status: "pending",
        resources: [
          { type: "video", title: "Fireship — REST vs GraphQL", url: "https://www.youtube.com/watch?v=PeAOEAmR0D0" },
          { type: "doc", title: "GraphQL docs", url: "https://graphql.org/learn/" },
        ],
      },
    },
    {
      id: "net-08", position: { x: 0, y: 1050 }, type: "roadmapNode",
      data: {
        title: "CDNs & Caching",
        description: "Edge networks, cache invalidation, cache headers. Make content fast globally.",
        time: "2 hours", status: "pending",
        resources: [
          { type: "doc", title: "Cloudflare — What is a CDN?", url: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/" },
          { type: "video", title: "Hussein Nasser — CDN", url: "https://www.youtube.com/watch?v=RI9np1LWzqw" },
        ],
      },
    },
    {
      id: "net-09", position: { x: 0, y: 1200 }, type: "roadmapNode",
      data: {
        title: "Network Security",
        description: "Firewalls, VPNs, DDoS, CORS, CSP. Understand the attack surface of networked systems.",
        time: "3 hours", status: "pending",
        resources: [
          { type: "video", title: "Computerphile — Network Security", url: "https://www.youtube.com/watch?v=BcDZS7iYNsA" },
          { type: "doc", title: "Cloudflare Learning Center", url: "https://www.cloudflare.com/learning/" },
        ],
      },
    },
  ],
  edges: [
    { id: "ne1-2", source: "net-01", target: "net-02", animated: true },
    { id: "ne2-3", source: "net-02", target: "net-03", animated: true },
    { id: "ne3-4", source: "net-03", target: "net-04", animated: true },
    { id: "ne4-5", source: "net-04", target: "net-05", animated: true },
    { id: "ne5-6", source: "net-05", target: "net-06", animated: true },
    { id: "ne6-7", source: "net-06", target: "net-07", animated: true },
    { id: "ne7-8", source: "net-07", target: "net-08", animated: true },
    { id: "ne8-9", source: "net-08", target: "net-09", animated: true },
  ],
};
