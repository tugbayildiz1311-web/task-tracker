# Task Tracker - Görev Takip Sistemi

## Projenin Amacı

Bu projenin amacı kullanıcıların günlük görevlerini oluşturabildiği, görüntüleyebildiği, düzenleyebildiği ve takip edebildiği basit bir görev takip sistemi geliştirmektir.

Uygulamada görevlerin öncelik, durum ve son tarih bilgileri tutulacaktır. Kullanıcılar görevler arasında arama ve filtreleme yapabilecek ve görev verileri LocalStorage kullanılarak tarayıcıda saklanacaktır.

İlk aşamada temel ve çalışan bir MVP oluşturulacak, daha gelişmiş özellikler sonraki sürümlerde eklenecektir.

## User Stories

1. Kullanıcı olarak yeni görev eklemek istiyorum, böylece yapacaklarımı kaydedebilirim.

2. Kullanıcı olarak oluşturduğum görevleri listelemek istiyorum, böylece tüm görevlerimi görebilirim.

3. Kullanıcı olarak bir görevi düzenlemek istiyorum, böylece yanlış veya değişen bilgileri güncelleyebilirim.

4. Kullanıcı olarak bir görevi silmek istiyorum, böylece artık gerekli olmayan görevleri kaldırabilirim.

5. Kullanıcı olarak görevin durumunu değiştirmek istiyorum, böylece yapılacak, devam eden ve tamamlanan görevleri takip edebilirim.

6. Kullanıcı olarak göreve öncelik vermek istiyorum, böylece önemli görevleri diğerlerinden ayırabilirim.

7. Kullanıcı olarak göreve son tarih eklemek istiyorum, böylece görevimi ne zamana kadar tamamlamam gerektiğini görebilirim.

8. Kullanıcı olarak görevler arasında arama yapmak istiyorum, böylece istediğim göreve hızlıca ulaşabilirim.

9. Kullanıcı olarak görevleri durum veya önceliğe göre filtrelemek istiyorum, böylece yalnızca ilgilendiğim görevleri görüntüleyebilirim.

10. Kullanıcı olarak sayfayı yenilediğimde görevlerimin kaybolmamasını istiyorum, böylece daha önce oluşturduğum görevleri tekrar görebilirim.

## MVP Özellikleri

İlk sürümde aşağıdaki özelliklerin tamamlanması hedeflenmektedir:

- Görev ekleme
- Görev listeleme
- Görev düzenleme
- Görev silme
- Görev durumunu değiştirme
- Öncelik seçme
- Son tarih belirleme
- Görev arama
- Görev filtreleme
- LocalStorage ile verileri saklama
- Form doğrulama
- Boş liste mesajı

## Sonraki Sürümlerde Eklenebilecek Özellikler

- Kullanıcı hesabı ve giriş sistemi
- Backend ve gerçek veritabanı
- Görev kategorileri
- Etiket sistemi
- Sürükle-bırak görev yönetimi
- Bildirim ve hatırlatıcılar
- Karanlık mod
- Görev istatistikleri
- Görevleri sıralama
- Bulut senkronizasyonu

## Task Veri Modeli

Örnek bir görev aşağıdaki yapıda tutulacaktır:

```json
{
  "id": 1,
  "title": "Staj raporunu tamamla",
  "description": "Günlük staj raporunu hazırlayıp kontrol et",
  "priority": "high",
  "status": "todo",
  "dueDate": "2026-09-01",
  "createdAt": "2026-08-29T18:00:00.000Z"
}
```

## Veri Alanları

| Alan | Veri Tipi | Zorunlu | Açıklama |
| --- | --- | --- | --- |
| id | Number | Evet | Görevin benzersiz kimliği |
| title | String | Evet | Görev başlığı |
| description | String | Hayır | Görevin ayrıntılı açıklaması |
| priority | String | Evet | Görevin öncelik seviyesi |
| status | String | Evet | Görevin mevcut durumu |
| dueDate | String / Date | Evet | Görevin son tarihi |
| createdAt | String / Date | Evet | Görevin oluşturulma zamanı |

## Doğrulama Kuralları

- Başlık boş olamaz.
- Başlık en fazla 100 karakter olabilir.
- Öncelik yalnızca `low`, `medium` veya `high` olabilir.
- Durum yalnızca `todo`, `in-progress` veya `done` olabilir.
- Son tarih geçerli bir tarih olmalıdır.
- Görev oluşturulurken benzersiz bir `id` oluşturulmalıdır.
- `createdAt` değeri görev oluşturulduğunda otomatik olarak belirlenmelidir.

## Kullanıcı Akışı

Temel kullanıcı akışı şu şekilde planlanmıştır:

Kullanıcı uygulamayı açar  
→ Görev listesini görüntüler  
→ Yeni görev formunu doldurur  
→ Form doğrulaması yapılır  
→ Görev oluşturulur  
→ Görev listeye eklenir  
→ Veri LocalStorage'a kaydedilir  
→ Kullanıcı görevi düzenleyebilir, silebilir veya durumunu değiştirebilir  
→ Arama ve filtreleme ile istediği görevleri görüntüleyebilir

## Dosya Yapısı

```text
task-tracker/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    ├── storage.js
    └── ui.js
```

### Dosyaların Görevleri

- `index.html`: Uygulamanın HTML yapısı
- `css/style.css`: Uygulamanın görünümü
- `js/app.js`: Ana uygulama mantığı ve event işlemleri
- `js/storage.js`: LocalStorage işlemleri
- `js/ui.js`: DOM ve kullanıcı arayüzü işlemleri

## Backlog / Yapılacaklar

- [ ] Ana HTML yapısını oluştur
- [ ] Görev ekleme formunu oluştur
- [ ] Task veri modelini uygula
- [ ] Form doğrulamalarını ekle
- [ ] Görevleri ekranda listele
- [ ] Görev düzenleme özelliğini ekle
- [ ] Görev silme özelliğini ekle
- [ ] Görev durumunu değiştirme özelliğini ekle
- [ ] Öncelik seçimini ekle
- [ ] Son tarih alanını ekle
- [ ] Görev arama özelliğini ekle
- [ ] Filtreleme özelliğini ekle
- [ ] LocalStorage kaydetme/yükleme işlemlerini ekle
- [ ] Boş liste görünümünü oluştur
- [ ] Hata ve kullanıcı mesajlarını ekle
- [ ] Uygulamayı farklı senaryolarla test et

## MVP Yaklaşımı

İlk sürümde temel görev yönetimi özelliklerinin eksiksiz ve çalışır olması hedeflenmektedir. İlk sürüm tamamlanmadan kullanıcı hesabı, backend, bildirim veya gelişmiş istatistik gibi ek özelliklere geçilmeyecektir.