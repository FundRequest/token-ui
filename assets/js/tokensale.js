(function () {
  Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ' '));
  };
  $.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
      .exec(window.location.href);
    if (results && results.length > 0) {
      return results[1] || 0;
    }
    return 0;
  };

  var $balance = $('#balance');
  var $vestedBalance = $('#vested-balance');
  var $vestingEnd = $('#vesting-end');
  var $addressResult = $('#address-result');
  var $transfersEnabled = $('#transfers-enabled');
  var $resultsContainer = $('#result');
  var $balanceEtherscan = $('#balance-etherscan');
  var $vestedBalanceContainer = $('#vested-balance-container');

  var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.fundrequest.io"));
  window.web3 = web3;
  var contractAbi = web3.eth.contract(JSON.parse(
    '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"creationBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newController","type":"address"}],"name":"changeController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_blockNumber","type":"uint256"}],"name":"balanceOfAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cloneTokenName","type":"string"},{"name":"_cloneDecimalUnits","type":"uint8"},{"name":"_cloneTokenSymbol","type":"string"},{"name":"_snapshotBlock","type":"uint256"},{"name":"_transfersEnabled","type":"bool"}],"name":"createCloneToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isFundRequestToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"parentToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_amount","type":"uint256"}],"name":"generateTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transfersEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parentSnapShotBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_amount","type":"uint256"}],"name":"destroyTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"claimTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenFactory","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_transfersEnabled","type":"bool"}],"name":"enableTransfers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_currentValue","type":"uint256"},{"name":"_amount","type":"uint256"}],"name":"safeApprove","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"controller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tokenFactory","type":"address"},{"name":"_parentToken","type":"address"},{"name":"_parentSnapShotBlock","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_decimalUnits","type":"uint8"},{"name":"_tokenSymbol","type":"string"},{"name":"_transfersEnabled","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_token","type":"address"},{"indexed":true,"name":"_controller","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"ClaimedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_cloneToken","type":"address"},{"indexed":false,"name":"_snapshotBlock","type":"uint256"}],"name":"NewCloneToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Approval","type":"event"}]'));
  var frContract = contractAbi.at('0x4DF47B4969B2911C966506E3592c41389493953b');

  var vestingWalletAbi = web3.eth.contract(JSON.parse(
    '[{"constant":true,"inputs":[],"name":"vestingToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"schedules","outputs":[{"name":"startTimeInSec","type":"uint256"},{"name":"cliffTimeInSec","type":"uint256"},{"name":"endTimeInSec","type":"uint256"},{"name":"totalAmount","type":"uint256"},{"name":"totalAmountWithdrawn","type":"uint256"},{"name":"depositor","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addressChangeRequests","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"approvedWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_vestingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"registeredAddress","type":"address"},{"indexed":false,"name":"depositor","type":"address"},{"indexed":false,"name":"startTimeInSec","type":"uint256"},{"indexed":false,"name":"cliffTimeInSec","type":"uint256"},{"indexed":false,"name":"endTimeInSec","type":"uint256"},{"indexed":false,"name":"totalAmount","type":"uint256"}],"name":"VestingScheduleRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"registeredAddress","type":"address"},{"indexed":false,"name":"amountWithdrawn","type":"uint256"}],"name":"Withdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"registeredAddress","type":"address"},{"indexed":false,"name":"amountWithdrawn","type":"uint256"},{"indexed":false,"name":"amountRefunded","type":"uint256"}],"name":"VestingEndedByOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldRegisteredAddress","type":"address"},{"indexed":true,"name":"newRegisteredAddress","type":"address"}],"name":"AddressChangeRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldRegisteredAddress","type":"address"},{"indexed":true,"name":"newRegisteredAddress","type":"address"}],"name":"AddressChangeConfirmed","type":"event"},{"constant":false,"inputs":[{"name":"_addressToRegister","type":"address"},{"name":"_depositor","type":"address"},{"name":"_startTimeInSec","type":"uint256"},{"name":"_cliffTimeInSec","type":"uint256"},{"name":"_endTimeInSec","type":"uint256"},{"name":"_totalAmount","type":"uint256"},{"name":"_percentage","type":"uint256"}],"name":"registerVestingScheduleWithPercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressToRegister","type":"address"},{"name":"_depositor","type":"address"},{"name":"_startTimeInSec","type":"uint256"},{"name":"_cliffTimeInSec","type":"uint256"},{"name":"_endTimeInSec","type":"uint256"},{"name":"_totalAmount","type":"uint256"}],"name":"registerVestingSchedule","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressToEnd","type":"address"},{"name":"_addressToRefund","type":"address"}],"name":"endVesting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newRegisteredAddress","type":"address"}],"name":"requestAddressChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_oldRegisteredAddress","type":"address"},{"name":"_newRegisteredAddress","type":"address"}],"name":"confirmAddressChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_approvedWallet","type":"address"}],"name":"setApprovedWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_target","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]'));

  var vestingWalletContract = vestingWalletAbi.at('0x73B29c2a2Dd1c18Fe95cc43F67E5D202651794fE');

  var showResultsContainer = function () {
    $resultsContainer.show();
  };

  var showAccountBalance = function (address) {
    frContract.balanceOf.call(address, function (err, res) {
      if (!err) {
        var bal = Number(web3.fromWei(res.toNumber()));
        $balance.html('' + bal.format(2));
        $addressResult.html(address);
        $balanceEtherscan.html('<a class="etherscan" href="https://etherscan.io/token/0x4df47b4969b2911c966506e3592c41389493953b?a=' + address + '" target="_blank">(view on etherscan)</a>');
        showResultsContainer();
      }
    });
  };

  var showVestingBalance = function (address) {
    vestingWalletContract.schedules.call(address, function (err, res) {
      if (!err && res && res.length === 6) {
        var totalAmount = Number(web3.fromWei(res[3].toNumber()));
        var totalAmountWithdrawn = Number(web3.fromWei(res[4].toNumber()));
        var amountPending = totalAmount - totalAmountWithdrawn;
        var dateEnd = new Date(0);
        dateEnd.setUTCSeconds(Number(res[2].toNumber()));
        var vestingEnd = dateToYMD(dateEnd);
        $vestedBalance.html('' + amountPending.format(2));
        $vestingEnd.html(vestingEnd);
        if(amountPending > 0) {
          $vestedBalanceContainer.show();
        }
      } else {
        console.error(err);
      }
    })
  }
  ;
  function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  var showTransfersEnabled = function () {
    frContract.transfersEnabled.call(function (err, res) {
      if (!err) {
        if (res === true) {
          $transfersEnabled.html('<i class="fas fa-check-circle"></i>');
        } else {
          $transfersEnabled.html('<i class="fas fa-times-circle"></i>');
        }
      }
    });
  };

  $('#statusForm').submit(function (e) {
    e.preventDefault();
    $balance.html('');
    $addressResult.html('&nbsp;');
    $balanceEtherscan.html('');
    $vestedBalanceContainer.hide();
    var address = $('#address').val();
    showAccountBalance(address);
    showVestingBalance(address);
  });

  showTransfersEnabled();

  var addressUrlParam = $.urlParam('address');
  if (addressUrlParam) {
    $('#address').val(addressUrlParam);
    $('#statusForm').trigger("submit");
  }

  $('a.info').click(function (e) {
    e.preventDefault();
  });


  // });
})();
