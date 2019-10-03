package main

import (
	"bytes"
	"strings"

	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/address"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/state"
)

var SYSTEM = sdk.Export(_init)
var PUBLIC = sdk.Export(registerMedia, areRegistered)

var OWNER_KEY = []byte("__CONTRACT_OWNER__")

func _init() {
	state.WriteBytes(OWNER_KEY, address.GetSignerAddress())
}

func _isRegistered(id string) bool {
	key := []byte(id)
	return state.ReadString(key) != ""
}

func areRegistered(ids string) string {
	res := ""
	for _, id := range strings.Split(ids, ",") {
		if _isRegistered(id) {
			res = res + "1"
		} else {
			res = res + "0"
		}
	}
	return res
}

func registerMedia(mediaID, metadata string) {
	if !bytes.Equal(state.ReadBytes(OWNER_KEY), address.GetSignerAddress()) {
		panic("Only contract owner can register media")
	}
	key := []byte(mediaID)
	if _isRegistered(mediaID) {
		panic("The record already exists")
	}
	state.WriteString(key, metadata)
}

func main() {}