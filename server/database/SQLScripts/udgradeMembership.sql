

DELIMITER $$


create procedure upgradeMembership(
	in _userId int,
    in _currentMem int
)
begin
	if exists (select * from upgrade_request where user_id = _userId and current_mem_type = _currentMem and req_status = 'Pending')
	then
        update member
        set membership_type = _currentMem + 1
        where user_id = _userId;


        update upgrade_request
        set req_status = 'Complete'
        where user_id = _userId and current_mem_type = _currentMem and upgrade_mem_type = _currentMem + 1;
	end if;


end$$


DELIMITER ;