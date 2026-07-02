# Template-uri de email Supabase (în română) — ComparaAcum.ro

Acestea sunt emailurile de sistem trimise de Supabase (confirmare cont, resetare parolă etc.). Implicit sunt în engleză — înlocuiește-le cu variantele de mai jos.

## Unde le pui
Supabase → **Authentication** → **Emails** → **Templates**. Pentru fiecare tip de email:
1. Pune textul de la **„Subject"** în câmpul Subject.
2. Copiază blocul HTML de la **„Mesaj (HTML)"** în câmpul Message body.
3. Apasă **Save**.

> Variabilele dintre acolade (ex. `{{ .ConfirmationURL }}`) sunt completate automat de Supabase — nu le modifica.
>
> Notă: aceste emailuri pleacă prin serverul de email al Supabase. Pentru branding complet și livrabilitate mai bună, poți configura SMTP custom (Resend) în Authentication → Emails → SMTP Settings — atunci vor pleca de pe `@comparaacum.ro`.

---

## 1. Confirmare cont (Confirm signup)

**Subject:**
```
Confirmă-ți contul ComparaAcum.ro
```

**Mesaj (HTML):**
```html
<div style="max-width:520px;margin:0 auto;padding:32px 24px;font-family:Inter,Arial,sans-serif;background:#0a0a0f;color:#e8f0fe;">
  <div style="font-size:22px;font-weight:800;margin-bottom:24px;">Compara<span style="color:#00d4ff;">Acum</span>.ro</div>
  <div style="background:#1a1a2e;border:1px solid rgba(0,212,255,.3);border-radius:16px;padding:28px;">
    <h1 style="font-size:20px;margin:0 0 12px;">Bine ai venit! 👋</h1>
    <p style="font-size:15px;line-height:1.6;color:#a0a0b8;margin:0 0 16px;">
      Mai e un singur pas: confirmă-ți adresa de email ca să-ți activezi contul și să poți salva căutări și seta mementouri de expirare.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#00d4ff;color:#000;text-decoration:none;font-weight:800;padding:12px 24px;border-radius:8px;font-size:15px;">Confirmă contul →</a>
  </div>
  <p style="font-size:12px;color:#606080;margin-top:20px;line-height:1.6;">
    Dacă nu tu ai creat acest cont, poți ignora liniștit acest email.
  </p>
</div>
```

---

## 2. Resetare parolă (Reset Password)

**Subject:**
```
Resetează-ți parola ComparaAcum.ro
```

**Mesaj (HTML):**
```html
<div style="max-width:520px;margin:0 auto;padding:32px 24px;font-family:Inter,Arial,sans-serif;background:#0a0a0f;color:#e8f0fe;">
  <div style="font-size:22px;font-weight:800;margin-bottom:24px;">Compara<span style="color:#00d4ff;">Acum</span>.ro</div>
  <div style="background:#1a1a2e;border:1px solid rgba(0,212,255,.3);border-radius:16px;padding:28px;">
    <h1 style="font-size:20px;margin:0 0 12px;">Resetare parolă 🔑</h1>
    <p style="font-size:15px;line-height:1.6;color:#a0a0b8;margin:0 0 16px;">
      Am primit o cerere de resetare a parolei pentru contul tău. Apasă butonul de mai jos ca să setezi o parolă nouă.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#00d4ff;color:#000;text-decoration:none;font-weight:800;padding:12px 24px;border-radius:8px;font-size:15px;">Setează parolă nouă →</a>
  </div>
  <p style="font-size:12px;color:#606080;margin-top:20px;line-height:1.6;">
    Dacă nu ai cerut tu resetarea, ignoră acest email — parola rămâne neschimbată.
  </p>
</div>
```

---

## 3. Link magic de autentificare (Magic Link)

**Subject:**
```
Linkul tău de autentificare ComparaAcum.ro
```

**Mesaj (HTML):**
```html
<div style="max-width:520px;margin:0 auto;padding:32px 24px;font-family:Inter,Arial,sans-serif;background:#0a0a0f;color:#e8f0fe;">
  <div style="font-size:22px;font-weight:800;margin-bottom:24px;">Compara<span style="color:#00d4ff;">Acum</span>.ro</div>
  <div style="background:#1a1a2e;border:1px solid rgba(0,212,255,.3);border-radius:16px;padding:28px;">
    <h1 style="font-size:20px;margin:0 0 12px;">Intră în cont 🔓</h1>
    <p style="font-size:15px;line-height:1.6;color:#a0a0b8;margin:0 0 16px;">
      Apasă butonul de mai jos ca să te autentifici în contul tău ComparaAcum.ro. Linkul e valabil un timp limitat.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#00d4ff;color:#000;text-decoration:none;font-weight:800;padding:12px 24px;border-radius:8px;font-size:15px;">Autentifică-te →</a>
  </div>
  <p style="font-size:12px;color:#606080;margin-top:20px;line-height:1.6;">
    Dacă nu ai cerut tu acest link, poți ignora acest email.
  </p>
</div>
```

---

## 4. Schimbare adresă de email (Change Email Address)

**Subject:**
```
Confirmă noua adresă de email ComparaAcum.ro
```

**Mesaj (HTML):**
```html
<div style="max-width:520px;margin:0 auto;padding:32px 24px;font-family:Inter,Arial,sans-serif;background:#0a0a0f;color:#e8f0fe;">
  <div style="font-size:22px;font-weight:800;margin-bottom:24px;">Compara<span style="color:#00d4ff;">Acum</span>.ro</div>
  <div style="background:#1a1a2e;border:1px solid rgba(0,212,255,.3);border-radius:16px;padding:28px;">
    <h1 style="font-size:20px;margin:0 0 12px;">Confirmă schimbarea emailului ✉️</h1>
    <p style="font-size:15px;line-height:1.6;color:#a0a0b8;margin:0 0 16px;">
      Ai cerut schimbarea adresei de email de la <strong style="color:#fff;">{{ .Email }}</strong> la <strong style="color:#fff;">{{ .NewEmail }}</strong>. Confirmă mai jos.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#00d4ff;color:#000;text-decoration:none;font-weight:800;padding:12px 24px;border-radius:8px;font-size:15px;">Confirmă noua adresă →</a>
  </div>
  <p style="font-size:12px;color:#606080;margin-top:20px;line-height:1.6;">
    Dacă nu ai cerut tu această schimbare, contactează-ne imediat.
  </p>
</div>
```
