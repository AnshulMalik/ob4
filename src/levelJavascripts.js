// Level 1: 
if(window.location.pathname=='/level/1') {
    console.log('javascrpt loaded');
    document.getElementById('levimg').setAttribute('usemap', '#immapid');
    document.getElementById('immapid').onclick = function(event) {
        event.preventDefault();
        document.getElementById('submitAnswerBox').value = "{You_Nail3d_1t_Now_JUsT_sUBm1t}";
    }
}