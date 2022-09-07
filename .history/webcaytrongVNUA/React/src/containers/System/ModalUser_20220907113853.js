



<Modal isOpen={modal} toggle={toggle} className={className}>
    <ModalHeader toggle={toggle}>ADD NEW USER:</ModalHeader>
    <ModalBody>
        Enter new user's information:
    </ModalBody>
<ModalFooter>
    <Button color="primary" onClick={toggle}>Add new user</Button>
    <Button color="secondary" onClick={toggle}>Cancel</Button>
</ModalFooter>
</Modal>