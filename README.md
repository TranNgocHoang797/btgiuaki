# 📦 SmartShelf – Hệ thống quản lý kệ hàng siêu thị thông minh

## 1. Tên đề tài

**Hệ thống quản lý kệ hàng siêu thị thông minh (SmartShelf – RetailTech)**

## 2. Tên trang đã thực hiện

**Trang chủ – Dashboard quản lý kệ hàng** (SmartShelf Dashboard)

## 3. Mục đích của trang

Trang chủ của hệ thống giúp **nhân viên siêu thị** theo dõi nhanh trạng thái của toàn bộ kệ hàng trong cửa hàng (đầy / sắp hết / trống), dễ dàng tìm kiếm và lọc kệ theo sản phẩm hoặc trạng thái, đồng thời gửi yêu cầu bổ sung hàng ngay từ trang tổng quan — giúp giảm thời gian kiểm kê và tránh tình trạng hết hàng trên kệ.

## 4. Các chức năng chính

- **Thống kê nhanh**: hiển thị tổng số kệ, số kệ sắp hết hàng, số kệ trống cần xử lý gấp.
- **Hiển thị danh sách kệ hàng**: render dữ liệu từ mảng JavaScript thành các thẻ kệ hàng (mã kệ, sản phẩm, khu vực, số lượng, trạng thái).
- **Tìm kiếm sản phẩm**: tìm kệ theo tên sản phẩm hoặc mã kệ (không phân biệt hoa thường).
- **Lọc theo trạng thái**: lọc nhanh các kệ Đầy / Sắp hết / Trống.
- **Yêu cầu bổ sung hàng**: nhấn nút để gửi yêu cầu bổ sung cho kệ chưa đầy; nút chuyển sang trạng thái "Đã gửi yêu cầu" và khóa lại (tránh gửi trùng).
- **Responsive**: giao diện tự sắp xếp lại phù hợp khi xem trên điện thoại / màn hình nhỏ.

## 5. Công nghệ sử dụng

- **HTML5**: cấu trúc semantic (`header`, `nav`, `main`, `section`, `article`, `footer`), form chuẩn (`label`, `input`, `select`, `button`).
- **CSS3**: biến màu (CSS variables), Flexbox, Grid, hover, border-radius, Media Query responsive.
- **JavaScript (thuần, không framework)**: `array`, `object`, `filter()`, `forEach()`, `DOM` (`getElementById`, `innerHTML`, `textContent`, `classList`, `dataset`), sự kiện `input` / `change` / `submit` / `click` (event delegation), render dữ liệu từ mảng.
- Không sử dụng backend, database hay framework.

## 6. Liên kết

Figma
https://www.figma.com/slides/UA8XJCsr4pvXs3BJX0xDhY/shelf?node-id=1-102&t=vxfDleHp1XvHtLk4-0
Githud
https://github.com/TranNgocHoang797/btgiuaki
