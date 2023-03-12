import React from 'react'

export default function Profile_set() {
  return (
    <>
    <div className="container">
        <form action="">
            <div className="row">
                <div className="col">
                    <div class="form-group">
                        <label for="nameInput">Name:</label>
                        <input type="text" class="form-control" id="nameInput" placeholder="Enter name" name='name'/>
                    </div>
                    <div class="form-group">
                        <label for="AddressInput">Address:</label>
                        <input type="text" class="form-control" id="AddressInput" placeholder="Enter Address" name='address'/>
                    </div>
                </div>
                
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    </>
  )
}
