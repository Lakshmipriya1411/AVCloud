
DELIMITER $$

create procedure approveUser(
	in _userId int
)
begin

	update user
	set status = 'confirmed'
	where user_id = _userID and status = 'pending';

	update member
	set status = 'confirmed'
	where user_id = _userID  and status = 'pending';

    
end$$

DELIMITER ;
