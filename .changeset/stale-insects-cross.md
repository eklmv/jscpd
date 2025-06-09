---
"@eklmv/jscpd-core": patch
"@eklmv/jscpd-leveldb-store": patch
"@eklmv/jscpd-redis-store": patch
---

store.close now async, to be able to wait for level to close all databases
