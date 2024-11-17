import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from "thirdweb";

/**
* Contract events
*/



/**
 * Creates an event object for the AdminChanged event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { adminChangedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  adminChangedEvent()
 * ],
 * });
 * ```
 */ 
export function adminChangedEvent() {
  return prepareEvent({
    signature: "event AdminChanged(address previousAdmin, address newAdmin)",
  });
};
  



/**
 * Creates an event object for the Upgraded event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { upgradedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  upgradedEvent()
 * ],
 * });
 * ```
 */ 
export function upgradedEvent() {
  return prepareEvent({
    signature: "event Upgraded(address implementation)",
  });
};
  

/**
* Contract read functions
*/



/**
 * Calls the "admin" function on the contract.
 * @param options - The options for the admin function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { admin } from "TODO";
 * 
 * const result = await admin();
 * 
 * ```
 */
export async function admin(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xf851a440",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "implementation" function on the contract.
 * @param options - The options for the implementation function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { implementation } from "TODO";
 * 
 * const result = await implementation();
 * 
 * ```
 */
export async function implementation(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x5c60da1b",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
* Contract write functions
*/

/**
 * Represents the parameters for the "changeAdmin" function.
 */
export type ChangeAdminParams = {
  newAdmin: AbiParameterToPrimitiveType<{"internalType":"address","name":"newAdmin","type":"address"}>
};

/**
 * Calls the "changeAdmin" function on the contract.
 * @param options - The options for the "changeAdmin" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { changeAdmin } from "TODO";
 * 
 * const transaction = changeAdmin({
 *  newAdmin: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function changeAdmin(
  options: BaseTransactionOptions<ChangeAdminParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x8f283970",
  [
    {
      "internalType": "address",
      "name": "newAdmin",
      "type": "address"
    }
  ],
  []
],
    params: [options.newAdmin]
  });
};


/**
 * Represents the parameters for the "upgradeTo" function.
 */
export type UpgradeToParams = {
  newImplementation: AbiParameterToPrimitiveType<{"internalType":"address","name":"newImplementation","type":"address"}>
};

/**
 * Calls the "upgradeTo" function on the contract.
 * @param options - The options for the "upgradeTo" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { upgradeTo } from "TODO";
 * 
 * const transaction = upgradeTo({
 *  newImplementation: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function upgradeTo(
  options: BaseTransactionOptions<UpgradeToParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x3659cfe6",
  [
    {
      "internalType": "address",
      "name": "newImplementation",
      "type": "address"
    }
  ],
  []
],
    params: [options.newImplementation]
  });
};


/**
 * Represents the parameters for the "upgradeToAndCall" function.
 */
export type UpgradeToAndCallParams = {
  newImplementation: AbiParameterToPrimitiveType<{"internalType":"address","name":"newImplementation","type":"address"}>
data: AbiParameterToPrimitiveType<{"internalType":"bytes","name":"data","type":"bytes"}>
};

/**
 * Calls the "upgradeToAndCall" function on the contract.
 * @param options - The options for the "upgradeToAndCall" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { upgradeToAndCall } from "TODO";
 * 
 * const transaction = upgradeToAndCall({
 *  newImplementation: ...,
 *  data: ...,
 * });
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function upgradeToAndCall(
  options: BaseTransactionOptions<UpgradeToAndCallParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x4f1ef286",
  [
    {
      "internalType": "address",
      "name": "newImplementation",
      "type": "address"
    },
    {
      "internalType": "bytes",
      "name": "data",
      "type": "bytes"
    }
  ],
  []
],
    params: [options.newImplementation, options.data]
  });
};


