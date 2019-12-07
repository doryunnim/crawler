// function click() {
//     console.log('1234567890');

//     var checkBoxs = $('input:checkbox[name="like_check"]')
//     // nameTxt.innerHTML=+profile.getName();
//     var userData = document.querySelector("#name").innerHTML;
//     console.log(userData);
//     var brandRequest = new Array();
//     console.log('빈 체크박스', brandRequest);

//     for (var i = 0; i < checkBoxs.length; i++) {
//         if (checkBoxs[i].checked == true) {
//             console.log(i + '번이 체크되어있습니다');
//             brandRequest.push(i);
//         }
//     }

//     console.log('전체 체크박스', brandRequest);
//     console.log('유저데이터', userData);
//     // console.log(JSON.stringify(brandRequest));
//     // userid, brandid
//     // 1       0
//     // 1       1
//     // insert table(userid, brandid) values(userid, i)
//     // select id from user
//     // const formData=new FormData();
//     // formData.append('brand',brandRequest);
//     // formData.append('user',userData);

//     console.log('데이터 확인');
//     // console.log(formData.getAll('brand'));
//     // console.log(formData.getAll('user'));

//     fetch('http://localhost:3000/brand/addbrand', {
//             method: 'POST',
//             body: JSON.stringify({
//                 brand: brandRequest,
//                 user: userData
//             }),
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8"
//             }
//         })
//         .then(res => res.json())
//         .then(json => console.log(json));


//     // window.location.href = `http://localhost:3000/brand/addbrand/${brandRequest}`;
// }

// var button = document.getElementById('btn');

// button.onclick = function () {
//     click()
// }



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

        // 데이터 수신이 완료되면 표시
        xhr.addEventListener('load', function () {
            console.log(xhr.responseText);
        });

    } else if(!check) {
        var url = "brand/delbrand/" + brand_name.className
        xhr.open('DELETE', url);
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(data);
        xhr.addEventListener('load', function () {
            console.log(xhr.responseText);
        });
    }
})

$(document).ready(()=>{
    setTimeout(function() {
        var profile = gauth.currentUser.get().getBasicProfile();
        var profileEmail = profile.getEmail();
        var xhr = new XMLHttpRequest();
        var data = {
            'user_email': profileEmail,
        };
        data = JSON.stringify(data);

        xhr.onload = function(){
            if(xhr.status === 200 || xhr.status === 201){
                console.log('adsasdasddasdasdas');
                var likeChecks = JSON.parse(xhr.responseText);
                likeChecks.map((likeCheck)=>{
                    var brandCheck = likeCheck.brand_name;
                    $("input:checkbox[class = '"+ brandCheck + "']").prop("checked", true);
                });
            }
        }
        xhr.open('POST', "/");
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(data);
    }, 700);
})