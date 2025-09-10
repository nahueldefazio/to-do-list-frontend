# 🚀 Despliegue en Vercel - Frontend Angular

## 📋 Prerrequisitos

1. **Cuenta de Vercel**: Crear cuenta en [vercel.com](https://vercel.com)
2. **Vercel CLI**: Ya instalado globalmente
3. **Git**: Para conectar con el repositorio

## 🔧 Configuración completada

### ✅ Archivos de configuración creados:

- **`vercel.json`** (directorio raíz): Configuración de Vercel para subdirectorio frontend
- **`.vercelignore`** (directorio raíz): Excluye backend y archivos innecesarios
- **`package.json`** (directorio raíz): Scripts de build para Vercel
- **`frontend/package.json`**: Script `build:vercel` agregado
- **`frontend/angular.json`**: Configuración de Angular creada
- **`README.md`** (directorio raíz): Documentación del proyecto completo

### ✅ Configuración de Vercel (directorio raíz):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist/frontend"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### ✅ Scripts de build (directorio raíz):

```json
{
  "scripts": {
    "build": "cd frontend && npm install && npm run build",
    "install": "cd frontend && npm install",
    "start": "cd frontend && npm start"
  }
}
```

## 🚀 Pasos para desplegar

### 1. **Login en Vercel**
```bash
vercel login
```
- Selecciona tu método preferido (GitHub, Google, GitLab)
- Sigue las instrucciones en el navegador

### 2. **Desplegar desde CLI**
```bash
vercel
```
- Sigue las preguntas interactivas
- Selecciona el proyecto
- Confirma la configuración

### 3. **Desplegar desde GitHub (Recomendado)**

#### Opción A: Conectar repositorio
1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click en "New Project"
3. Conecta tu repositorio de GitHub
4. Selecciona el directorio `frontend`
5. Vercel detectará automáticamente Angular

#### Opción B: Importar proyecto
1. Sube tu código a GitHub
2. En Vercel Dashboard, click "Import Project"
3. Selecciona tu repositorio
4. Configura:
   - **Framework Preset**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend`

#### Opción C: Despliegue desde directorio raíz (Recomendado)
1. Sube tu código a GitHub
2. En Vercel Dashboard, click "Import Project"
3. Selecciona tu repositorio
4. Vercel detectará automáticamente la configuración desde `vercel.json`
5. **Root Directory**: Dejar vacío (directorio raíz)
6. **Build Command**: Se detecta automáticamente
7. **Output Directory**: Se detecta automáticamente

## ⚙️ Variables de entorno

Si necesitas variables de entorno, agrégalas en:
- **Vercel Dashboard** → Project → Settings → Environment Variables

### Variables recomendadas:
```
NODE_ENV=production
```

## 🔄 Despliegues automáticos

Una vez configurado:
- **Push a main/master**: Despliegue automático a producción
- **Push a otras ramas**: Preview deployments automáticos
- **Pull Requests**: Preview deployments para testing

## 📱 URLs generadas

- **Producción**: `https://tu-proyecto.vercel.app`
- **Preview**: `https://tu-proyecto-git-rama.vercel.app`

## 🛠️ Comandos útiles

```bash
# Ver deployments
vercel ls

# Ver logs
vercel logs

# Remover deployment
vercel remove

# Configurar dominio personalizado
vercel domains add tu-dominio.com
```

## 🎯 Configuración específica para Angular

### Build optimizado:
- ✅ **AOT Compilation**: Habilitado
- ✅ **Tree Shaking**: Automático
- ✅ **Minificación**: CSS y JS
- ✅ **Gzip**: Compresión automática

### Routing:
- ✅ **SPA Routing**: Configurado para Angular Router
- ✅ **404 Fallback**: Redirige a `index.html`

## 🚨 Solución de problemas

### Error: Build failed
```bash
# Verificar build local
ng build

# Ver logs en Vercel
vercel logs
```

### Error: Module not found /vercel/path1/src/main.ts
- ✅ **SOLUCIONADO**: Archivo `angular.json` creado correctamente
- ✅ **SOLUCIONADO**: Configuración de Vercel movida al directorio raíz
- ✅ **SOLUCIONADO**: Scripts de build creados en directorio raíz
- ✅ **SOLUCIONADO**: Build local funciona correctamente
- ✅ **SOLUCIONADO**: Vercel ahora ejecuta build desde directorio correcto

### Error: 404 en rutas
- Verificar configuración de `vercel.json`
- Asegurar que todas las rutas redirijan a `index.html`

### Error: Assets no cargan
- Verificar `base href` en `index.html`
- Revisar rutas relativas en `angular.json`

### Error: Schema validation failed
- ✅ **SOLUCIONADO**: Configuración de Angular corregida
- ✅ **SOLUCIONADO**: Builder actualizado a `@angular-devkit/build-angular:browser`

## 📊 Monitoreo

Vercel incluye:
- ✅ **Analytics**: Métricas de rendimiento
- ✅ **Speed Insights**: Core Web Vitals
- ✅ **Function Logs**: Logs de serverless functions
- ✅ **Real User Monitoring**: Métricas de usuarios reales

## 🎉 ¡Listo para desplegar!

Tu aplicación Angular está completamente configurada para Vercel. Solo necesitas:

1. **Hacer login**: `vercel login`
2. **Desplegar**: `vercel` o conectar GitHub
3. **¡Disfrutar tu app en producción!** 🚀
