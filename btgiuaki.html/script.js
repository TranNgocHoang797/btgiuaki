/* ============================================================
   SmartShelf - script.js
   Trang: Trang chủ quản lý kệ hàng (Dashboard)

   Các chức năng chính:
   1. Render dữ liệu từ mảng -> vẽ các thẻ kệ hàng lên trang
   2. Tìm kiếm sản phẩm theo tên / mã kệ
   3. Lọc kệ theo trạng thái (Đầy / Sắp hết / Trống)
   4. Nút "Yêu cầu bổ sung" -> đổi trạng thái nút sau khi bấm
   ============================================================ */

// ---------- 1. DỮ LIỆU MẪU (Mock Data) ----------
// Mỗi object mô tả 1 kệ hàng: mã kệ, tên sản phẩm, khu vực, trạng thái, số lượng
const shelfData = [
    { id: 'K01', product: 'Sữa tươi Vinamilk 1L',    location: 'Khu A', status: 'full',  stock: 45 },
    { id: 'K02', product: 'Mì tôm Hảo Hảo',          location: 'Khu B', status: 'empty', stock: 0 },
    { id: 'K03', product: 'Nước giải khát Coca-Cola', location: 'Khu C', status: 'low',   stock: 5 },
    { id: 'K04', product: 'Bánh gạo OneOne',         location: 'Khu B', status: 'full',  stock: 30 },
    { id: 'K05', product: 'Khăn giấy lụa',           location: 'Khu D', status: 'empty', stock: 0 },
    { id: 'K06', product: 'Nước mắm Nam Ngư',        location: 'Khu A', status: 'low',   stock: 3 }
];

// Mảng lưu mã các kệ đã gửi yêu cầu bổ sung (tránh bấm trùng 2 lần)
const requestedIds = [];

// ---------- 2. CÁC HÀM HỖ TRỢ ----------

// Trả về tên class CSS theo trạng thái (dùng để đổi màu viền trái của thẻ)
function getStatusClass(status) {
    if (status === 'full') return 'status-full';
    if (status === 'low') return 'status-low';
    if (status === 'empty') return 'status-empty';
    return '';
}

// Trả về chuỗi HTML của nhãn (badge) hiển thị trạng thái
function getBadge(status) {
    if (status === 'full') return '<span class="badge full">Đầy</span>';
    if (status === 'low') return '<span class="badge low">Sắp hết</span>';
    if (status === 'empty') return '<span class="badge empty">Trống</span>';
    return '';
}

// Tạo HTML cho 1 thẻ kệ hàng, trả về dưới dạng chuỗi
function createShelfCard(shelf) {
    // Kiểm tra kệ này đã gửi yêu cầu bổ sung chưa
    const isRequested = requestedIds.includes(shelf.id);

    // Chỉ hiện nút "Yêu cầu bổ sung" khi kệ chưa đầy và chưa gửi yêu cầu
    let buttonHTML = '';
    if (shelf.status !== 'full') {
        if (isRequested) {
            buttonHTML = '<button class="action-btn" disabled>✓ Đã gửi yêu cầu</button>';
        } else {
            buttonHTML = '<button class="action-btn" data-id="' + shelf.id + '">Yêu cầu bổ sung</button>';
        }
    }

    // return chuỗi HTML của cả thẻ kệ (article)
    return `
        <article class="shelf-card ${getStatusClass(shelf.status)}">
            <header class="shelf-header">
                <h3>Kệ: ${shelf.id}</h3>
                ${getBadge(shelf.status)}
            </header>
            <div class="shelf-details">
                <p><strong>Sản phẩm:</strong> ${shelf.product}</p>
                <p><strong>Khu vực:</strong> ${shelf.location}</p>
                <p><strong>Tồn trên kệ:</strong> ${shelf.stock}</p>
            </div>
            ${buttonHTML}
        </article>
    `;
}

// ---------- 3. RENDER DỮ LIỆU ----------

// Vẽ danh sách kệ hàng vào trang và cập nhật số liệu thống kê
function renderShelves(data) {
    const grid = document.getElementById('shelf-grid');
    const emptyMessage = document.getElementById('empty-message');

    // Bước 1: Xóa toàn bộ nội dung cũ trong lưới
    grid.innerHTML = '';

    // Bước 2: Duyệt từng kệ trong mảng, nối HTML vào lưới
    data.forEach(function (shelf) {
        grid.innerHTML += createShelfCard(shelf);
    });

    // Bước 3: Hiện / ẩn thông báo khi không có kết quả tìm kiếm
    if (data.length === 0) {
        emptyMessage.classList.remove('hidden');   // hiện thông báo
    } else {
        emptyMessage.classList.add('hidden');      // ẩn thông báo
    }

    // Bước 4: Cập nhật 3 ô thống kê phía trên
    updateWidgets(data);
}

// Cập nhật số liệu ở các ô thống kê (tổng số kệ, sắp hết, trống)
function updateWidgets(data) {
    const total = data.length;

    // filter: lọc ra các kệ có trạng thái 'low' rồi đếm số lượng
    const low = data.filter(function (item) { return item.status === 'low'; }).length;
    const empty = data.filter(function (item) { return item.status === 'empty'; }).length;

    document.getElementById('total-shelves').textContent = total;
    document.getElementById('low-stock').textContent = low;
    document.getElementById('empty-shelves').textContent = empty;
}

// ---------- 4. TÌM KIẾM VÀ LỌC ----------

// Lấy danh sách kệ đã lọc theo ô tìm kiếm và ô chọn trạng thái
function getFilteredData() {
    // Lấy giá trị người dùng nhập, chuyển về chữ thường để so sánh dễ hơn
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;

    // filter: chỉ giữ lại những kệ thỏa mãn cả 2 điều kiện
    return shelfData.filter(function (shelf) {
        // Điều kiện 1: tên sản phẩm HOẶC mã kệ chứa từ khóa tìm kiếm
        const matchSearch = shelf.product.toLowerCase().includes(searchTerm)
            || shelf.id.toLowerCase().includes(searchTerm);

        // Điều kiện 2: trạng thái khớp với ô lọc (hoặc đang chọn "Tất cả")
        const matchStatus = statusFilter === 'all' || shelf.status === statusFilter;

        // Chỉ giữ kệ khi cả 2 điều kiện đều đúng
        return matchSearch && matchStatus;
    });
}

// Hàm chạy mỗi khi người dùng gõ chữ hoặc đổi lựa chọn lọc
function handleFilter() {
    renderShelves(getFilteredData());
}

// ---------- 5. NÚT "YÊU CẦU BỔ SUNG" ----------

// Xử lý khi bấm nút: đổi nút thành "Đã gửi yêu cầu" và khóa lại
function handleRequestRestock(button) {
    const shelfId = button.dataset.id;   // lấy mã kệ từ thuộc tính data-id

    // Nếu kệ này đã gửi yêu cầu rồi thì dừng lại (tránh bấm trùng)
    if (requestedIds.includes(shelfId)) return;

    // Lưu mã kệ vào danh sách đã gửi yêu cầu
    requestedIds.push(shelfId);

    // Đổi giao diện nút ngay trên trang
    button.textContent = '✓ Đã gửi yêu cầu';
    button.disabled = true;
    button.classList.add('requested');
}

// ---------- 6. GẮN SỰ KIỆN (Event Listeners) ----------

// Khi gõ vào ô tìm kiếm -> lọc lại ngay
document.getElementById('search').addEventListener('input', handleFilter);

// Khi đổi lựa chọn ở ô lọc trạng thái -> lọc lại ngay
document.getElementById('status-filter').addEventListener('change', handleFilter);

// Chặn hành vi mặc định của form (tránh trang reload khi bấm Enter)
document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault();
});

// Lắng nghe sự kiện click ở cả vùng lưới kệ hàng
// (kỹ thuật "event delegation": 1 listener xử lý cho tất cả các nút)
document.getElementById('shelf-grid').addEventListener('click', function (event) {
    // Kiểm tra phần tử được bấm có phải là nút "Yêu cầu bổ sung" không
    if (!event.target.classList.contains('action-btn')) return;
    handleRequestRestock(event.target);
});

// ---------- 7. KHỞI CHẠY ----------

// Khi toàn bộ HTML đã tải xong thì vẽ danh sách kệ hàng lên trang
window.addEventListener('DOMContentLoaded', function () {
    renderShelves(shelfData);
});
