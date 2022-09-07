



<Modal isOpen={modal} toggle={toggle} className={className}>
    <ModalHeader toggle={toggle}>Add new user</ModalHeader>
    <ModalBody>
        Enter new user's information:
    </ModalBody>
<ModalFooter>
    <Button color="primary" onClick={toggle}>Add new</Button>
</ModalFooter>
</Modal>