<template>
    <div class="page-loading">
        <svg viewBox="0 0 50 50" class="page-loading page-loading-curve">
            <circle r="24" cx="25" cy="25" fill="none" stroke="#f0f0f0" stroke-width="2"></circle>
            <circle r="24" cx="25" cy="25" fill="none" stroke="#e4007f" stroke-width="2" class="page-loading-progress"></circle>
            <text x="25" y="25" dy=".27em" fill="#dedede" style="font-size: 21px;" class="page-loading-text">vip</text>
        </svg>
    </div>
</template>
<style scoped>
.page-loading {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 25px;
    text-align: center;
    font-size: 0;
    margin-left: -25px;
    margin-top: -25px;
    left: 50%;
    z-index: 1550;
    top: 43%;
    position: fixed;
    vertical-align: middle
}
.page-loading svg{
    width: 1.5rem;
    height: 1.5rem;
}
.page-loading:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    overflow-y: hidden;
    vertical-align: middle
}

.page-loading-progress {
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
    -webkit-transform-origin: center;
    transform-origin: center;
    stroke-dasharray: 10 150.796;
    -webkit-animation: loadingLinearLine linear 2s infinite, loadingLinearSpin linear 2s infinite;
    animation: loadingLinearLine linear 2s infinite, loadingLinearSpin linear 2s infinite
}

.page-loading-text {
    text-anchor: middle;
    font: 21px/1 Helvetica
}

.page-loading-curve .page-loading-progress {
    -webkit-animation: loadingCurveLine linear 2s infinite, loadingCurveSpin linear 2s infinite;
    animation: loadingCurveLine linear 2s infinite, loadingCurveSpin linear 2s infinite
}

@-webkit-keyframes loadingLinearLine {

    0%,
    to {
        stroke-dasharray: 0 150.796
    }

    50% {
        stroke-dasharray: 150.796 150.796
    }
}

@keyframes loadingLinearLine {

    0%,
    to {
        stroke-dasharray: 0 150.796
    }

    50% {
        stroke-dasharray: 150.796 150.796
    }
}

@-webkit-keyframes loadingLinearSpin {

    0%,
    50% {
        -webkit-transform: rotate(-90deg)
    }

    to {
        -webkit-transform: rotate(270deg)
    }
}

@keyframes loadingLinearSpin {

    0%,
    50% {
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg)
    }

    to {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg)
    }
}

@-webkit-keyframes loadingCurveLine {

    0%,
    to {
        stroke-dasharray: 0 150.796
    }

    35.8%,
    85.8% {
        stroke-dasharray: 75.398 150.796
    }

    50% {
        stroke-dasharray: 150.796 150.796
    }
}

@keyframes loadingCurveLine {

    0%,
    to {
        stroke-dasharray: 0 150.796
    }

    35.8%,
    85.8% {
        stroke-dasharray: 75.398 150.796
    }

    50% {
        stroke-dasharray: 150.796 150.796
    }
}

@-webkit-keyframes loadingCurveSpin {

    0%,
    50% {
        -webkit-transform: rotate(-90deg)
    }

    85.8% {
        -webkit-transform: rotate(90deg)
    }

    to {
        -webkit-transform: rotate(270deg)
    }
}

@keyframes loadingCurveSpin {

    0%,
    50% {
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg)
    }

    85.8% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg)
    }

    to {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg)
    }
}
</style>
