# Portfolio Deployment Guide

This guide will help you deploy your Data Science portfolio to various platforms.

## 🚀 Quick Deploy to GitHub Pages

### Prerequisites
- GitHub account
- Repository with portfolio files

### Steps
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click `Settings` tab
   - Scroll to `Pages` section
   - Source: Select `Deploy from a branch`
   - Branch: `main` and folder `/ (root)`
   - Click `Save`

3. **Access Your Site**
   - Your portfolio will be available at: `https://username.github.io/repository-name`

## 🌐 Custom Domain Setup

### Option 1: GitHub Pages with Custom Domain

1. **Add CNAME File**
   - Create `CNAME` file in root directory
   - Add your domain: `yourdomain.com`

2. **Configure DNS**
   - Go to your domain provider
   - Add these DNS records:
     ```
     Type: A    Name: @    Value: 185.199.108.153
     Type: A    Name: @    Value: 185.199.109.153
     Type: A    Name: @    Value: 185.199.110.153
     Type: A    Name: @    Value: 185.199.111.153
     Type: CNAME Name: www Value: username.github.io
     ```

3. **Update GitHub Settings**
   - In repository Settings > Pages
   - Enter your custom domain
   - Enforce HTTPS

### Option 2: Netlify Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Netlify"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click `New site from Git`
   - Select your repository
   - Build settings: Leave default (static site)
   - Click `Deploy site`

3. **Custom Domain (Optional)**
   - Go to Site settings > Domain management
   - Add custom domain
   - Update DNS records as provided by Netlify

### Option 3: Vercel Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Confirm deployment settings
   - Your site will be live at provided URL

## 📱 Mobile App Deployment

### Progressive Web App (PWA)

Your portfolio is PWA-ready with the following features:

1. **Manifest File** - Already included (`site.webmanifest`)
2. **Service Worker** - Can be added for offline functionality
3. **App Icons** - Favicon and app icons configured

### Add Service Worker (Optional)

Create `sw.js` in root directory:
```javascript
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/assets/Subhash_Koli_Resume.pdf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
```

Add to `index.html` before closing `</body>`:
```html
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
</script>
```

## 🔧 Configuration Files

### Create `site.webmanifest`
```json
{
  "name": "Subhash Koli - Data Science Portfolio",
  "short_name": "SK Portfolio",
  "description": "Data Scientist & Analyst Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/favicon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Create `_redirects` (for Netlify)
```
/*    /index.html   200
```

## 📊 Performance Optimization

### Before Deployment
1. **Test Performance**
   - Google PageSpeed Insights
   - GTmetrix
   - WebPageTest

2. **Optimize Images**
   - Use WebP format when possible
   - Compress images without quality loss
   - Add lazy loading attributes

3. **Minify Code (Optional)**
   ```bash
   # CSS minification
   npx clean-css-cli -o styles.min.css styles.css
   
   # JS minification
   npx terser script.js -o script.min.js
   ```

### After Deployment
1. **Monitor Performance**
   - Google Search Console
   - Google Analytics
   - Core Web Vitals

2. **Check SEO**
   - Google Rich Results Test
   - Schema Markup Validator
   - Meta tags analyzer

## 🔍 SEO Checklist

### Essential SEO
- [ ] Title tag (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] H1 tag on each page
- [ ] Proper heading hierarchy
- [ ] Image alt text
- [ ] Internal links
- [ ] External links (authoritative sites)

### Advanced SEO
- [ ] Structured data (JSON-LD)
- [ ] Open Graph tags
- [ ] Twitter Cards
- [ ] XML sitemap
- [ ] Robots.txt
- [ ] Canonical URLs

### Technical SEO
- [ ] SSL certificate (HTTPS)
- [ ] Mobile-friendly design
- [ ] Fast loading speed
- [ ] No broken links
- [ ] Proper URL structure

## 🚨 Troubleshooting

### Common Issues

**GitHub Pages not updating**
- Clear browser cache
- Check if you're pushing to correct branch
- Verify repository settings

**Custom domain not working**
- Wait 24-48 hours for DNS propagation
- Check DNS records with `dig` command
- Verify CNAME file content

**Images not loading**
- Check file paths (case-sensitive)
- Verify files are in correct directory
- Check file permissions

**Styles not applying**
- Validate CSS syntax
- Check file paths in HTML
- Clear browser cache

**JavaScript not working**
- Check browser console for errors
- Validate JavaScript syntax
- Ensure script tags have correct attributes

### Performance Issues

**Slow loading**
- Optimize images
- Minify CSS/JS files
- Enable GZIP compression
- Use CDN for external resources

**Poor mobile experience**
- Test on actual devices
- Check viewport settings
- Optimize touch targets
- Reduce animations on mobile

## 📈 Analytics Setup

### Google Analytics
1. Create GA4 property
2. Add tracking code to `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console
1. Add property in GSC
2. Verify ownership (HTML file or DNS)
3. Submit sitemap
4. Monitor performance

## 🔐 Security Considerations

### Basic Security
- [ ] HTTPS enabled
- [ ] No sensitive data in client-side code
- [ ] Validate all user inputs
- [ ] Use secure headers (CSP, HSTS)

### Advanced Security
- [ ] Content Security Policy
- [ ] Subresource Integrity
- [ ] Security headers
- [ ] Regular dependency updates

## 📞 Support

If you encounter any issues during deployment:

1. **Check the browser console** for error messages
2. **Validate HTML/CSS** using online validators
3. **Test in different browsers** and devices
4. **Check GitHub Pages status** if using GitHub
5. **Review platform documentation** for specific issues

---

**Your portfolio is now ready to impress recruiters and showcase your Data Science expertise!** 🚀
