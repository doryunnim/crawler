$('input:checkbox').on('change', function (e) {
    var profile = gauth.currentUser.get().getBasicProfile();
    var profileEmail = profile.getEmail();
    var target = e.target;
    var img = target.parentElement;
    var brand_name = img.parentElement;

    var xhr = new XMLHttpRequest();
    var data = {
        'user_email': profileEmail,
        'brand_name': brand_name.className
    };
    data = JSON.stringify(data);
    var check = $(target).is(":checked");
    if (check) {
        var url = "brand/addbrand/" + brand_name.className
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(data);
        alert('관심 브랜드로 등록되었습니다.')
    } else if (!check) {
        var url = "brand/delbrand/" + brand_name.className
        xhr.open('DELETE', url);
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(data);
        alert('취소합니다.')
    }
})

$(document).ready(() => {
    setTimeout(function () {
        var profile = gauth.currentUser.get().getBasicProfile();
        if (profile) {
            var profileEmail = profile.getEmail();
            var xhr = new XMLHttpRequest();
            var data = {
                'user_email': profileEmail,
            };
            data = JSON.stringify(data);

            xhr.onload = function () {
                if (xhr.status === 200 || xhr.status === 201) {
                    var likeChecks = JSON.parse(xhr.responseText);
                    likeChecks.map((likeCheck) => {
                        var brandCheck = likeCheck.brand_name;
                        $("input:checkbox[class = '" + brandCheck + "']").prop("checked", true);
                    });
                }
            }
            xhr.open('POST', "/");
            xhr.setRequestHeader('Content-type', "application/json");
            xhr.send(data);
        }
    }, 1300);
})