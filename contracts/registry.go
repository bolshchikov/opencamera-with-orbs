package main

import (
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/state"
)

var SYSTEM = sdk.Export(_init)
var PUBLIC = sdk.Export(registerMedia, verifyMedia)

func _init() {
}

func _isRegistered(id string) bool {
	key := []byte(id)
	return state.ReadString(key) != ""
}

func verifyMedia(mediaID string) string {
	if !_isRegistered(mediaID) {
		panic("The record with such id does not exist")
	}
	return state.ReadString([]byte(mediaID))
}

func registerMedia(mediaID, metadata string) {
	key := []byte(mediaID)
	if _isRegistered(mediaID) {
		panic("The record already exists")
	}
	state.WriteString(key, metadata)
}

func main() {}
