App = {
    web3Provider: null,
    contracts: {},
    account: 0x0,

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: async function() {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            $("#erro").innerHTML = "Please check metamask";
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract();
    },

    initContract: function() {
        $.getJSON("Elections.json", function(election) {
            App.contracts.Elections = TruffleContract(election);
            App.contracts.Elections.setProvider(App.web3Provider);
            if (list)
                return App.genLocal();
            else if (proc) {
                App.listenForEvents();
                return App.proc();
            } else if (candReg) {
                App.listenForEvents();
                return App.cReg();
            }
        });
    },
    listenForEvents: function() {
        App.contracts.Elections.deployed().then(function(instance) {
            instance.votedEvent({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(error, result) {
                if (result.args._aadh == aadh) {
                    $("#loader").hide();
                    $("#vSuc").show();
                    $("#vRec").append("<tr><td><b>Transaction hash: </b></td><td>" + txHash + "</td></tr>");
                    $("#vRec").append("<tr><td><b>Your Aadhar: </b></td><td>" + aadh + "</td></tr>");
                    $("#vRec").append("<tr><td><b>Voted for: </b></td><td>" + result.args._candName + "</td></tr>");
                    $("#vRec").append("<tr><td><b>Timestamp: </b></td><td>" + result.args._time + "</td></tr>");
                    $("#voteMsg").show();
                    setTimeout(function() {
                        window.location.href = "http://localhost/tee/des.php"
                    }, 15000);
                }
            });
            instance.candEvent({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(error, result) {
                if (result.args._aadh == caadh && !recgen) {
                    recgen = true;
                    $("#loader").hide();
                    $("#vSuc").show();
                    $("#vRec").append("<tr><td><b>Transaction hash: </b></td><td>" + txHash + "</td></tr>");
                    $("#vRec").append("<tr><td><b>Your Name: </b></td><td>" + result.args._candName + "</td></tr>");
                    $("#vRec").append("<tr><td><b>Your aadhar: </b></td><td>" + result.args._aadh + "</td></tr>");
                    $("#vRec").append("<tr><td><b>Nomination Id: </b></td><td>" + result.args._candidateId + "</td></tr>");
                    $("#vRec").append("<tr><td><b>Timestamp: </b></td><td>" + result.args._time + "</td></tr>");
                    $("#voteMsg").show();
                    setTimeout(function() {
                        window.location.href = "http://localhost/tee/des.php"
                    }, 15000);
                }
            });
        });
    },

    cReg: function() {
        $("#regForm").hide();
        $("#loader").show();
        var elInstance;
        App.contracts.Elections.deployed().then(function(instance) {
            elInstance = instance;
            return elInstance.regCand(cname, caadh, zip, mHash, v, r, s);
        }).then(function(_str) {
            var str = _str;
            txHash = str.tx;
            console.log(str);
        });
    },

    proc: function() {
        $("#loader").show();
        $("#voteMsg").hide();
        var elInstance;
        App.contracts.Elections.deployed().then(function(instance) {
            elInstance = instance;
            return elInstance.castVote(cand, aadh, zip, mHash, v, r, s);
        }).then(function(_str) {
            var str = _str;
            txHash = str.tx;
            console.log(str);
        });
    },

    genLocal: function() {
        var zipCode = $("#zipCode").val();
        var elInstance;
        $("#loader").show();
        $("#candList").hide();
        App.contracts.Elections.deployed().then(function(instance) {
            elInstance = instance;
            return instance.candidatesCount();
        }).then(function(cCount) {
            var candidateList = $("#candidateList");
            candidateList.empty();
            console.log(cCount);
            for (var i = 1; i <= cCount; i++) {
                elInstance.candidates(i).then(function(candidate) {
                    var id = candidate[0];
                    var name = candidate[1];
                    var aadhar = candidate[2];
                    var _zipCode = candidate[3];
                    var _votes = candidate[4];
                    if (zipCode == _zipCode) {
                        var candTemp = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + aadhar + "</td><td>" + zipCode + "</td><td>" + _votes + "</td><td><a href='proc.php?cId=" + id + "'><input type='button' class='btn btn-primary' value='Vote' /></a></td></tr>";
                        candidateList.append(candTemp);
                    }
                });
            }
            $("#loader").hide();
            $("#candList").show();
        });

    },

};

$(function() {
    $(window).load(function() {
        App.init();
    });
});