# 🎯 MSW Quick Reference

## Toggle Between Mock and Real Backend

### Use Mock APIs (MSW Enabled)
```bash
# .env
VITE_ENABLE_MSW=true
```
✅ No backend needed  
✅ Instant responses  
✅ Pre-configured test users  

**Test Users:**
- `admin@flowai.com` (admin role)
- `user@flowai.com` (user role)
- Any password works!

---

### Use Real Backend (MSW Disabled)
```bash
# .env
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=http://localhost:3000/api
```
✅ Real API calls  
✅ Backend must be running  
✅ Production-like testing  

---

## How It Works

```typescript
// Same code works for both modes!
const { login } = useAuth();

// With MSW enabled: Intercepted by MSW mock
// With MSW disabled: Hits real backend
await login({ email, password });
```

**API contracts are identical!** Just toggle the environment variable.

---

## Check Current Mode

Look at browser console:
- `🔶 MSW is enabled` = Using mocks
- `🌐 MSW is disabled` = Using real backend

---

## Common Commands

```bash
# Start with MSW (default)
npm run dev

# Switch to real backend
# 1. Edit .env: VITE_ENABLE_MSW=false
# 2. Restart: npm run dev

# Build for production (MSW auto-disabled)
npm run build
```

---

## Full Documentation

See **[MSW_GUIDE.md](./MSW_GUIDE.md)** for complete details:
- API contracts
- Adding new endpoints
- Testing strategies
- Troubleshooting

---

**🚀 Start developing immediately with MSW!**

