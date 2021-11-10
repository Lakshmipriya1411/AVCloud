
DELIMITER $$

create procedure updateUserDetails(
	in _userId int,
    in _isAdmin bit,
    in _street varchar(25),
	in _city varchar(25),
	in _zipCode varchar(25),
	in _startDate date,
	in _endDate date,
	in _membershipType int
)
begin

	if(_isAdmin = 1)
    then
		update user
		set street = _street,
			city = _city,
            zip_code = _zipCode
		where user_id = _userID;
        
        update member
        set start_date =_startDate,
			end_date = _endDate,
            membership_type = _membershipType
        where user_id = _userID;
        
	end if;
    
    if(_isAdmin = 0)
    then
		update user
		set street = _street,
			city = _city,
            zip_code = _zipCode
		where user_id = _userID;
    end if;
	
end$$

DELIMITER ;
