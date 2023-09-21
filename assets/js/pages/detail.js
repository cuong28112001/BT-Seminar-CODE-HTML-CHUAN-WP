// comment
$("#view-action").on("click", function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(".more__icon").removeClass("active");
        $(".more__comment--list").removeClass("active");
    } else {
        $(this).addClass("active");
        $(".more__icon").addClass("active");
        $(".more__comment--list").addClass("active");
    }
});

// useful actions

// reaction detail(like or unlike)

$(document).ready(function () {
    let idTheme = $("#themeID").text();

    // reaction like or unlike

    let theme_reaction = localStorage.getItem("theme_reaction" + idTheme);

    if (!("theme_reaction" + idTheme in localStorage)) {
        localStorage.setItem("theme_reaction" + idTheme, "0");
    }

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == "theme_reaction" + idTheme) {
            if (theme_reaction == "1") {
                $(".feedback__group--like").toggleClass(
                    "feedback__group--like-active"
                );
            } else if (theme_reaction == "2") {
                $(".feedback__group--unlike").toggleClass(
                    "feedback__group--unlike-active"
                );
            }
        }
    }

    // useful actions

    let useful_reaction = localStorage.getItem("useful_reaction" + idTheme);

    if (!("useful_reaction" + idTheme in localStorage)) {
        localStorage.setItem("useful_reaction" + idTheme, "0");
    }

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == "useful_reaction" + idTheme) {
            if (useful_reaction == "1" || useful_reaction == "2") {
                $(".questionbox__btn").addClass("d-none");
                $(".questionbox__heading").text(
                    "Cảm ơn bạn đã đánh giá bài viết này"
                );
            }
        }
    }
});

// reaction like or unlike

let idTheme = $("#themeID").text();

const changeReactionLike = (key = idTheme) => {
    let theme_reaction = localStorage.getItem("theme_reaction" + key);

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == "theme_reaction" + key) {
            if (theme_reaction == "0") {
                localStorage.setItem(localStorage.key(i), "1");
            } else if (theme_reaction == "1") {
                localStorage.setItem(localStorage.key(i), "0");
            } else if (theme_reaction == "2") {
                localStorage.setItem(localStorage.key(i), "1");
                $(".feedback__group--unlike").toggleClass(
                    "feedback__group--unlike-active"
                );
            }

            $(".feedback__group--like").toggleClass(
                "feedback__group--like-active"
            );
        }
    }
};

const changeReactionUnLike = (key = idTheme) => {
    let theme_reaction = localStorage.getItem("theme_reaction" + key);

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == "theme_reaction" + key) {
            if (theme_reaction == "0") {
                localStorage.setItem(localStorage.key(i), "2");
            } else if (theme_reaction == "2") {
                localStorage.setItem(localStorage.key(i), "0");
            } else if (theme_reaction == "1") {
                localStorage.setItem(localStorage.key(i), "2");
                $(".feedback__group--like").toggleClass(
                    "feedback__group--like-active"
                );
            }
            $(".feedback__group--unlike").toggleClass(
                "feedback__group--unlike-active"
            );
        }
    }
};

// useful actions

const actionYes = (key = idTheme) => {
    let useful_reaction = localStorage.getItem("useful_reaction" + key);

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == "useful_reaction" + key) {
            if (useful_reaction == "0") {
                localStorage.setItem(localStorage.key(i), "1");
                $(".questionbox__btn").addClass("d-none");
                $(".questionbox__heading").text(
                    "Cảm ơn bạn đã đánh giá bài viết này"
                );
            }
        }
    }
};

const actionNo = (key = idTheme) => {
    let useful_reaction = localStorage.getItem("useful_reaction" + key);

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == "useful_reaction" + key) {
            if (useful_reaction == "0") {
                localStorage.setItem(localStorage.key(i), "2");
                $(".questionbox__btn").addClass("d-none");
                $(".questionbox__heading").text(
                    "Cảm ơn bạn đã đánh giá bài viết này"
                );
            }
        }
    }
};

//comments

const replayButtons = document.querySelectorAll(".reply__title");

replayButtons.forEach((item) => {
    item.addEventListener("click", () => {
        let itemParent = item.parentElement.parentElement;
        let divExist = itemParent.parentElement.querySelector(
            ".comment__form--container"
        );

        if (divExist) {
            divExist.remove();
        } else {
            itemParent.parentElement.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="comment__form--container pl-4 mb-4">
                        <form action="" class="row form__comment">
                            <div class="col-12 col-lg-6 form__group">
                                <input type="text" class="form__input" placeholder="User Name">
                            </div>
                            <div class="col-12 col-lg-6 form__group">
                                <input type="text" class="form__input" placeholder="Email">
                            </div>
                            <div class="col-12 form__group">
                                <textarea class="form__input"
                                    placeholder="Enter your comment here.."></textarea>
                            </div>
                            <div class="col-12 form__group d-flex align-items-center justify-content-center">
                                <span class="form__error pt-1 d-none">Vui lòng nhập đầy đủ thông tin để đăng bình luận</span>
                            </div>
                            <div class="col-12 form__button">
                                <button type="button" class="button__post">Post Comment</button>
                            </div>
                        </form>
                    </div>
                `
            );
        }
    });
});

//check input empty

const btn_Post = document.querySelector(".button__post");

btn_Post.addEventListener("click", () => {
    let form_inputs =
        btn_Post.parentElement.parentElement.querySelectorAll(".form__input");

    let error_mess =
        btn_Post.parentElement.parentElement.querySelector(".form__error");

    let div_error = error_mess.parentElement;

    let form_submit = btn_Post.parentElement.parentElement;

    let mess = "";
    let mailformat = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    let username = form_inputs[0];
    let email = form_inputs[1];
    let comment = form_inputs[2];

    if (
        $(username).val().length <= 0 ||
        $(email).val().length <= 0 ||
        $(comment).val().length <= 0
    ) {
        mess = "Vui lòng nhập đầy đủ thông tin để đăng bình luận";
    } else if (mailformat.test($(email).val()) == false) {
        mess = "Email không hợp lệ";
    }

    if (mess != "") {
        $(error_mess).text(mess);
        $(div_error).removeClass("d-none");
    } else {
        $(div_error).removeClass("d-block");
        $(form_submit).submit();
    }
});

$("body").bind("DOMSubtreeModified", function (e) {
    if (e.target.innerHTML.length > 0) {
        const btn_Posts = document.querySelectorAll(".button__post");

        btn_Posts.forEach((btn_Post) => {
            btn_Post.addEventListener("click", () => {
                let form_inputs =
                    btn_Post.parentElement.parentElement.querySelectorAll(
                        ".form__input"
                    );

                let error_mess =
                    btn_Post.parentElement.parentElement.querySelector(
                        ".form__error"
                    );

                let div_error = error_mess.parentElement;

                let form_submit = btn_Post.parentElement.parentElement;

                let mess = "";
                let mailformat = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

                let username = form_inputs[0];
                let email = form_inputs[1];
                let comment = form_inputs[2];

                if (
                    $(username).val().length <= 0 ||
                    $(email).val().length <= 0 ||
                    $(comment).val().length <= 0
                ) {
                    mess = "Vui lòng nhập đầy đủ thông tin để đăng bình luận";
                } else if (mailformat.test($(email).val()) == false) {
                    mess = "Email không hợp lệ";
                }

                if (mess != "") {
                    $(error_mess).text(mess);
                    $(div_error).removeClass("d-none");
                } else {
                    $(div_error).removeClass("d-block");
                    $(form_submit).submit();
                }
            });
        });
    }
});
