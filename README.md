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

## Gün 24 - Responsive Arayüz

Görev Takip Sistemi için JavaScript eklenmeden önce statik ve responsive kullanıcı arayüzü oluşturdum.

Arayüzde:

- Semantik `header`, `main`, `section` ve `footer` yapısı
- Görev ekleme formu
- Başlık, açıklama, öncelik, durum ve son tarih alanları
- Arama alanı
- Durum ve öncelik filtreleri
- Üç statik görev kartı
- Düzenle ve Sil butonları
- High, Medium ve Low öncelik badge'leri
- Boş liste görünümü
- Klavye kullanıcıları için görünür focus durumları
- Butonlarda hover durumları
- Mobile-first responsive tasarım

hazırladım.

Mobil görünümde form, filtreler ve görev kartları tek sütun halinde görüntülenmektedir. Geniş ekranlarda görev kartları grid yapısına geçmektedir.

### Masaüstü Görünümü

![Masaüstü görünümü](screenshots/gun-24-masaustu.png)

### 375px Mobil Görünüm

![375px mobil görünüm](screenshots/gun-24-mobil-375px.png)

## Gün 25 - Görev Ekleme ve Dinamik Listeleme

Görev Takip Sistemi'nin statik görev kartlarını kaldırarak görevlerin JavaScript üzerinden dinamik olarak oluşturulmasını sağladım.

### Görev Veri Modeli

Yeni görevler aşağıdaki alanlardan oluşmaktadır:

- `id`
- `title`
- `description`
- `priority`
- `status`
- `dueDate`
- `createdAt`

Görevler form üzerinden oluşturulduktan sonra `tasks` dizisine eklenmekte ve LocalStorage içerisinde saklanmaktadır.

### Form Akışı

Form gönderildiğinde aşağıdaki işlem sırasını uyguladım:

1. Formun submit event'ini yakaladım.
2. `preventDefault()` ile sayfanın yenilenmesini engelledim.
3. Form değerlerini aldım ve metin alanlarında `trim()` kullandım.
4. Verileri doğruladım.
5. Geçerli verilerle yeni task object oluşturdum.
6. Yeni görevi `tasks` dizisine ekledim.
7. Diziyi LocalStorage'a kaydettim.
8. `renderTasks()` fonksiyonuyla görev listesini yeniden oluşturdum.
9. Form alanlarını temizledim.
10. Kullanıcıya kısa süreli başarı mesajı gösterdim.

### Doğrulama Kontrolleri

Görev başlığının boş bırakılmasını engelledim.

Başlığın 100 karakterden uzun olması durumunda kullanıcıya hata mesajı gösterdim.

Priority ve status değerlerinin belirlenen seçeneklerden biri olmasını kontrol ettim.

Son tarih bilgisinin geçerli bir tarih olmasını doğruladım.

### Dinamik Görev Kartları

`renderTasks(tasks)` fonksiyonu ile görev kartlarını JavaScript kullanarak dinamik olarak oluşturdum.

Her kartta:

- Görev başlığı
- Açıklama
- Öncelik
- Durum
- Son tarih
- Düzenle butonu
- Sil butonu

görüntülenmektedir.

### LocalStorage

Görev listesini `JSON.stringify()` kullanarak LocalStorage içerisinde sakladım.

Sayfa açıldığında verileri `JSON.parse()` ile tekrar JavaScript dizisine dönüştürdüm.

Sayfayı yenileyerek eklediğim beş görevin kaybolmadığını ve LocalStorage üzerinden tekrar yüklendiğini doğruladım.

### Boş Liste Durumu

Görev bulunmadığında kullanıcıya:

`Henüz görev bulunmuyor`

mesajının gösterilmesini sağladım.

### Testler

- Boş görev başlığı kontrol edildi.
- 100 karakterden uzun başlık kontrol edildi.
- Beş farklı görev başarıyla eklendi.
- Low, Medium ve High öncelikleri test edildi.
- Todo, In Progress ve Done durumları test edildi.
- Sayfa yenilenerek LocalStorage kalıcılığı doğrulandı.

### Gün 25 Ekran Görüntüleri

#### Form Doğrulama

![Form doğrulama](screenshots/gun-25-form-dogrulama.png)

#### 100 Karakter Kontrolü

![100 karakter kontrolü](screenshots/gun-25-100-karakter-kontrolu.png)

#### Dinamik Görev Listesi

![Dinamik görev listesi](screenshots/gun-25-dinamik-gorev-listesi.png)

## Gün 26 - CRUD İşlemleri

Bugünkü çalışmada Görev Takip Sistemi üzerinde CRUD işlemlerini tamamladım.

CRUD yapısı:

- **Create:** Yeni görev ekleme
- **Read:** Görevleri listeleme
- **Update:** Mevcut görevi düzenleme ve durumunu değiştirme
- **Delete:** Görevi onay alarak silme

### Görev Düzenleme

Her görev kartına `Düzenle` butonu ekledim.

Düzenleme işlemi sırasında görev `id` değeri kullanılarak `find()` ile bulundu ve mevcut bilgileri forma aktarıldı.

Düzenleme modunu takip etmek için `editingTaskId` değişkenini kullandım.

Düzenleme modunda formun gönderme butonunun metni:

`Görevi Güncelle`

olarak değiştirildi.

Güncelleme tamamlandıktan sonra form tekrar normal görev ekleme moduna döndürüldü.

### Görev Silme

Her görev kartına `Sil` butonu ekledim.

Görev silinmeden önce kullanıcıdan `confirm()` ile onay alınmasını sağladım.

Görevin dizideki konumunu bulmak için `findIndex()` kullandım.

Kullanıcı işlemi onayladığında görev:

1. `tasks` dizisinden kaldırıldı.
2. LocalStorage yeniden güncellendi.
3. Görev listesi tekrar oluşturuldu.

Kullanıcı işlemi iptal ettiğinde görev silinmedi.

### Durum Değiştirme

Her görev kartına `Durum Değiştir` butonu ekledim.

Görev durumları aşağıdaki sırayla değişmektedir:

```text
Todo
→ In Progress
→ Done
→ Todo
```

Her durum değişikliğinde görev dizisini ve LocalStorage verisini güncelledim.

### Tamamlanan Görev Görünümü

`done` durumundaki görev kartlarını diğer görevlerden görsel olarak ayırdım.

Tamamlanan görevlerde:

- `Tamamlandı` etiketi gösterildi.
- Görev başlığının üzeri çizildi.
- Kart daha soluk bir görünüm aldı.

### Hata Kontrolü

Düzenleme, silme veya durum değiştirme sırasında verilen `id` ile eşleşen görev bulunamazsa uygulamanın hata vermeden işlemi sonlandırmasını sağladım.

### CRUD Testleri

- Yeni görev ekleme testi başarılı.
- Görev düzenleme testi başarılı.
- Düzenleme sonrası yeni görev oluşturulmadığı doğrulandı.
- Görev silme işleminde onay penceresi test edildi.
- Silme işleminde İptal seçildiğinde görevin korunduğu doğrulandı.
- Silme onaylandığında görevin listeden kaldırıldığı doğrulandı.
- Todo → In Progress → Done durum geçişleri test edildi.
- Done durumundaki tamamlandı görünümü kontrol edildi.
- Tüm işlemlerden sonra sayfa yenilenerek LocalStorage kalıcılığı doğrulandı.

### Gün 26 Ekran Görüntüleri

#### Görev Düzenleme Modu

![Görev düzenleme modu](screenshots/gun-26-gorev-duzenleme-modu.png)

#### Tamamlanan Görev Görünümü

![Done durum görünümü](screenshots/gun-26-done-durum-gorunumu.png)

#### Görev Silme Onayı

![Silme onayı](screenshots/gun-26-silme-onayi.png)

#### CRUD Son Durum

![CRUD son durum](screenshots/gun-26-crud-son-durum.png)

## Gün 27 - Görev Arama, Filtreleme ve Sıralama

Bugünkü çalışmada Görev Takip Sistemi'ne arama, filtreleme ve sıralama özellikleri ekledim.

### Arama

Görev başlığı ve açıklaması üzerinde büyük-küçük harf duyarsız arama yapılmasını sağladım.

Arama metnini `trim()` ve `toLowerCase()` kullanarak normalize ettim.

### Filtreleme

Görevleri aşağıdaki alanlara göre filtreleyebilecek yapı oluşturdum:

- Durum: Todo, In Progress, Done
- Öncelik: Low, Medium, High

Arama, durum filtresi ve öncelik filtresinin aynı anda çalışmasını `applyFilters()` fonksiyonu içerisinde yönettim.

Filtreleme sırasında ana `tasks` dizisini değiştirmeden ayrı bir filtrelenmiş liste kullandım.

### Sonuç Sayısı

Kullanıcıya görüntülenen görev sayısını göstermek için:

`5 görevden 2 tanesi gösteriliyor`

şeklinde sonuç bilgisi ekledim.

### Tarihe Göre Sıralama

Görevlerin son tarihlerine göre artan şekilde sıralanmasını sağladım.

Geçerli tarih değerlerini `Date` nesnesine dönüştürerek karşılaştırdım. Boş veya geçersiz tarihlerin uygulamada hata oluşturmamasını sağladım.

### Gecikmiş Görevler

Son tarihi geçmiş ve henüz `done` durumuna gelmemiş görevlerde `Gecikti` etiketi gösterdim.

Tamamlanan görevlerde gecikme etiketi gösterilmemektedir.

### Boş Filtre Sonucu

Filtre veya arama sonucunda eşleşen görev bulunmadığında:

`Filtrelere uygun görev bulunamadı`

mesajının gösterilmesini sağladım.

### Form Doğrulama

Başlık alanına yalnızca boşluk girilmesini engelledim. Başlık doğrulama mesajını ilgili input alanına yakın şekilde gösterdim.

### Test Senaryoları

1. Görev başlığına göre arama test edildi.
2. Görev açıklamasına göre arama test edildi.
3. Büyük-küçük harf duyarsız arama test edildi.
4. Durum filtresi test edildi.
5. Öncelik filtresi test edildi.
6. Arama, durum ve öncelik filtrelerinin birlikte çalışması test edildi.
7. Filtre sonucu bulunamayan senaryo test edildi.
8. Son tarihe göre artan sıralama test edildi.
9. Sonuç sayısının filtrelere göre değiştiği doğrulandı.
10. Gecikmiş ve tamamlanmamış görevlerde `Gecikti` etiketinin gösterildiği kontrol edildi.

### Gün 27 Ekran Görüntüleri

#### Arama ve Sonuç Sayısı

![Arama ve sonuç sayısı](screenshots/gun-27-arama-ve-sonuc-sayisi.png)

#### Çoklu Filtreleme

![Çoklu filtreleme](screenshots/gun-27-coklu-filtreleme.png)

#### Filtre Sonucu Bulunamadı

![Filtre sonucu yok](screenshots/gun-27-filtre-sonucu-yok.png)

#### Tarih Sıralama ve Geciken Görev

![Tarih sıralama ve geciken görev](screenshots/gun-27-tarih-siralama-ve-geciken-gorev.png)


## Gün 28 - JavaScript Refactor ve Modüler Yapı

Bugünkü çalışmada çalışan Görev Takip Sistemi kodunu özellikleri bozmadan yeniden düzenledim. JavaScript kodunu veri saklama, kullanıcı arayüzü ve uygulama akışı sorumluluklarına göre modüllere ayırdım.

### Refactor Öncesi Dosya Yapısı

```text
js/
├── app.js
├── storage.js
└── ui.js
```

Dosyalar ayrı olsa da birbirlerine normal script etiketleriyle bağlıydı ve fonksiyonlar global alanda kullanılıyordu.

### Refactor Sonrası Dosya Yapısı

```text
task-tracker/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── storage.js
│   └── ui.js
└── screenshots/
```

JavaScript dosyalarının sorumluluklarını şu şekilde ayırdım:

- `storage.js`: LocalStorage üzerinden görevleri yükleme ve kaydetme
- `ui.js`: Görev kartlarını oluşturma, DOM yardımcıları ve kullanıcı mesajları
- `app.js`: Event yönetimi, form işlemleri, CRUD işlemleri, arama ve filtreleme akışı

### ES Modules

`index.html` içerisinde JavaScript dosyasını ES Module olarak yükledim:

```html
<script type="module" src="js/app.js"></script>
```

Dosyalar arasında fonksiyon ve sabit paylaşımı için `export` ve `import` kullandım.

### Kod Düzenlemeleri

Uzun fonksiyonları daha küçük ve tek sorumluluklu fonksiyonlara ayırdım. Tekrarlanan görev bulma, tarih kontrolü ve filtreleme işlemlerini yardımcı fonksiyonlara taşıdım.

`todo`, `in-progress` ve `done` gibi tekrar eden durum değerlerini ortak sabitlerde tuttum. Değişken ve fonksiyon isimlerini daha açıklayıcı hale getirdim ve kullanılmayan kodları temizledim.

Görev kartlarındaki butonlar için ayrı ayrı event eklemek yerine event delegation yaklaşımı kullandım.

### Refactor Sonrası Test Kontrol Listesi

- [x] Yeni görev ekleme
- [x] Görev düzenleme
- [x] Görev silme ve onay işlemi
- [x] Görev durumunu değiştirme
- [x] LocalStorage kalıcılığı
- [x] Başlık ve açıklamada arama
- [x] Durum filtresi
- [x] Öncelik filtresi
- [x] Çoklu filtreleme
- [x] Son tarihe göre sıralama
- [x] Gecikmiş görev görünümü
- [x] Sayfa yenileme sonrası verilerin korunması

Refactor sonrasında uygulamanın önceki özelliklerinin çalışmaya devam ettiğini doğruladım.

### Gün 28 Ekran Görüntüleri

#### Modüler Dosya Yapısı

![Modüler dosya yapısı](screenshots/gun-28-moduler-dosya-yapisi.png)

#### Refactor Sonrası Uygulama

![Refactor sonrası uygulama](screenshots/gun-28-refactor-sonrasi-uygulama.png)

#### Refactor Sonrası Filtreleme

![Refactor sonrası filtreleme](screenshots/gun-28-refactor-sonrasi-filtreleme.png)