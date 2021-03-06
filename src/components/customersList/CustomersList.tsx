import React, { useState, useEffect } from "react"
import { db } from "@/services/firebase"
import { CustomerInfo } from "@/types/types"
const thousands = require("thousands")
import clsx from "clsx"
import NoData from "../nodata-alert/NoData"
import CobrarButton from "../Buttons/CobrarButton/CobrarButton"
import DeleteButton from "../Buttons/deleteButton/DeleteButton"
import Link from "next/link"

const CustomersList = () => {
  const [customers, setCustomers] = useState<CustomerInfo[]>([])

  const getCustomers = async () => {
    await db.collection("customers").onSnapshot(querySnapshot => {
      const customersList: CustomerInfo[] = []
      querySnapshot.forEach(doc => {
        customersList.push({ ...doc.data(), id: doc.id } as CustomerInfo)
      })
      setCustomers(customersList)
    })
  }

  useEffect(() => {
    getCustomers()
  }, [])
  return (
    <>
      <h2 className="text-center my-3">Listado de clientes</h2>
      {customers.length > 0 ? (
        <div className="text-center d-flex justify-content-center table-responsive">
          <table
            className=" table table-hover table-bordered"
            style={{ maxWidth: "600px", overflowX: "auto" }}
          >
            <thead className="text-center">
              <tr>
                <th>Cliente</th>
                <th>Cobrado?</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => {
                const successBg = clsx({
                  "table-success": customer.cobrado,
                })
                return (
                  <tr
                    key={customer.id}
                    className={successBg}
                    style={{ cursor: "pointer" }}
                  >
                    <Link href={`/customers/${customer.id}`}>
                      <td>
                        <strong>{customer.customer}</strong>
                        <br />
                        <strong>Renta: </strong>
                        {`Gs. ${thousands(customer.renta, ".")}`}
                        <br />
                        <strong>Departamento: </strong>
                        {customer.departamento}
                      </td>
                    </Link>
                    <td>
                      <CobrarButton
                        cobrado={customer.cobrado}
                        id={customer.id}
                        context="table"
                      />
                    </td>
                    <td>
                      <DeleteButton
                        cobrado={customer.cobrado}
                        id={customer.id}
                        context="table"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData />
      )}
    </>
  )
}

export default CustomersList
